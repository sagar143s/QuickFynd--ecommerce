import { PlusIcon, SquarePenIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import AddressModal from './AddressModal';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Protect, useAuth, useUser } from '@clerk/nextjs';
import axios from 'axios';
import { clearCart, fetchCart } from '@/lib/features/cart/cartSlice';
import countryList from 'react-select-country-list';
import { countryCodes } from '@/assets/countryCodes';

// OrderSummary component - India localization
const OrderSummary = ({ totalPrice = 0, items = [] }) => {
  const { user } = useUser();
  const { getToken, isSignedIn } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();

  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹';

  const addressList = useSelector((state) => state.address.list || []);

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(false);

  // Guest checkout fields
  const [isGuestCheckout, setIsGuestCheckout] = useState(!isSignedIn);
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'India'
  });

  // Shipping defaults tuned for India
  const [shipping, setShipping] = useState({
    enabled: true,
    shippingType: 'FLAT_RATE',
    flatRate: 50, // default INR flat rate
    perItemFee: 20,
    maxItemFee: null,
    freeShippingMin: 999, // free shipping threshold
    weightUnit: 'kg',
    baseWeight: 1,
    baseWeightFee: 50,
    additionalWeightFee: 30
  });

  // Auto-select first address when addresses are loaded
  useEffect(() => {
    if (isSignedIn && addressList.length > 0 && !selectedAddress) {
      setSelectedAddress(addressList[0]);
    }
  }, [addressList, isSignedIn, selectedAddress]);

  // Auto-select guest checkout if not signed in
  useEffect(() => {
    if (!isSignedIn) setIsGuestCheckout(true);
  }, [isSignedIn]);

  // Fetch shipping settings from server (if available)
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get('/api/shipping');
        if (data?.setting) {
          const s = data.setting;
          setShipping((prev) => ({
            ...prev,
            enabled: Boolean(s.enabled),
            shippingType: s.shippingType || prev.shippingType,
            flatRate: Number(s.flatRate ?? prev.flatRate),
            perItemFee: Number(s.perItemFee ?? prev.perItemFee),
            maxItemFee: s.maxItemFee ? Number(s.maxItemFee) : prev.maxItemFee,
            freeShippingMin: Number(s.freeShippingMin ?? prev.freeShippingMin),
            weightUnit: s.weightUnit || prev.weightUnit,
            baseWeight: Number(s.baseWeight ?? prev.baseWeight),
            baseWeightFee: Number(s.baseWeightFee ?? prev.baseWeightFee),
            additionalWeightFee: Number(s.additionalWeightFee ?? prev.additionalWeightFee)
          }));
        }
      } catch (err) {
        // keep defaults on error
      }
    };
    fetchSettings();
  }, []);

  // Shipping calculation - basic implementation for India
  const calculateShipping = () => {
    if (!shipping.enabled) return 0;

    // Free shipping if subtotal >= freeShippingMin
    if (Number(totalPrice) >= Number(shipping.freeShippingMin)) return 0;

    // FLAT_RATE: flat rate applied
    if (shipping.shippingType === 'FLAT_RATE') {
      // Optionally per item addition
      if (shipping.perItemFee) {
        const perItem = items.reduce((acc, it) => acc + (it.quantity || 1) * Number(shipping.perItemFee), 0);
        let total = Number(shipping.flatRate || 0) + perItem;
        if (shipping.maxItemFee) total = Math.min(total, Number(shipping.maxItemFee));
        return Math.round(total);
      }
      return Number(shipping.flatRate || 0);
    }

    // WEIGHT_BASED: estimate using item.weight if available
    if (shipping.shippingType === 'WEIGHT_BASED') {
      const totalWeight = items.reduce((acc, it) => acc + (Number(it.weight) || 0) * (it.quantity || 1), 0);
      if (totalWeight <= shipping.baseWeight) return Number(shipping.baseWeightFee || 0);
      const extra = Math.ceil(totalWeight - shipping.baseWeight) * Number(shipping.additionalWeightFee || 0);
      return Number(shipping.baseWeightFee || 0) + extra;
    }

    // default
    return Number(shipping.flatRate || 0);
  };

  const shippingFee = calculateShipping();

  // Coupon apply handler
  const handleCouponCode = async (event) => {
    event && event.preventDefault();
    try {
      if (!user) return toast.error('Please login to apply coupon');
      const token = await getToken();
      const storeId = items[0]?.storeId;
      const productIds = items.map((item) => item.id);

      const { data } = await axios.post(
        '/api/coupon',
        {
          code: couponCodeInput,
          cartTotal: totalPrice,
          productIds,
          storeId
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setCoupon(data.coupon || null);
      toast.success('Coupon applied');
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message || 'Unable to apply coupon');
    }
  };

  // Place order handler (handles guest and signed-in flows)
  const handlePlaceOrder = async (e) => {
    e && e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      // Guest checkout validation
      if (!isSignedIn && isGuestCheckout) {
        const missing = [];
        if (!guestInfo.name) missing.push('Name');
        if (!guestInfo.email) missing.push('Email');
        if (!guestInfo.phone) missing.push('Phone');
        if (!guestInfo.address) missing.push('Address');
        if (!guestInfo.city) missing.push('City');
        if (!guestInfo.state) missing.push('State');
        if (!guestInfo.country) missing.push('Country');

        if (missing.length > 0) {
          toast.error(`Please fill: ${missing.join(', ')}`);
          setLoading(false);
          return;
        }

        const orderData = {
          items,
          paymentMethod,
          isGuest: true,
          guestInfo
        };

        try {
          const { data } = await axios.post('/api/orders', orderData);

          if (data && (Array.isArray(data.orders) ? data.orders.length > 0 : data.order?.id)) {
            if (paymentMethod === 'STRIPE' && data.session?.url) {
              window.location.href = data.session.url;
            } else {
              dispatch(clearCart());
              toast.success(data.message || 'Order placed');
              const orderId = Array.isArray(data.orders) ? data.orders[0].id : data.order.id;
              router.push(`/order-success?orderId=${orderId}`);
            }
          } else {
            router.push('/order-failed');
          }
        } catch (err) {
          toast.error(err?.response?.data?.error || err?.message || 'Order failed');
        } finally {
          setLoading(false);
        }

        return;
      }

      // Signed-in user flow
      if (!user) {
        toast.error('Please login or use guest checkout');
        setLoading(false);
        return;
      }

      if (!selectedAddress) {
        toast.error('Please select a shipping address');
        setLoading(false);
        return;
      }

      const token = await getToken();

      const orderData = {
        addressId: selectedAddress.id,
        items,
        paymentMethod
      };

      if (coupon) orderData.couponCode = coupon.code;

      const { data } = await axios.post('/api/orders', orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data && data.order?.id) {
        if (paymentMethod === 'STRIPE' && data.session?.url) {
          window.location.href = data.session.url;
          return;
        }

        // Successful COD or non-redirect order
        dispatch(clearCart());
        toast.success(data.message || 'Order placed successfully');
        router.push('/orders');

        // Sync cart state
        try {
          dispatch(fetchCart({ getToken }));
        } catch (err) {
          // ignore
        }
      } else {
        router.push('/order-failed');
      }
    } catch (error) {
      router.push('/order-failed');
    } finally {
      setLoading(false);
    }
  };

  const allCountries = countryList().getData();

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-5">
      <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase">Order Summary</h2>

      {/* Quick Checkout/User Toggle */}
      {!isSignedIn && (
        <div className="my-4 pb-4 border-b border-slate-200">
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              id="guestCheckout"
              checked={isGuestCheckout}
              onChange={(e) => setIsGuestCheckout(e.target.checked)}
              className="accent-orange-500"
            />
            <label htmlFor="guestCheckout" className="cursor-pointer text-slate-600 font-medium">
              Quick Checkout
            </label>
          </div>
          {!isGuestCheckout && (
            <p className="text-xs text-slate-400 mt-2">
              Please <a href="/sign-in" className="text-orange-500 hover:underline">sign in</a> to continue
            </p>
          )}
        </div>
      )}

      {/* Guest Checkout Information Form */}
      {!isSignedIn && isGuestCheckout && (
        <div className="my-4 pb-4 border-b border-slate-200">
          <p className="text-slate-600 font-medium mb-3">Quick Checkout Information</p>
          <div className="space-y-2.5">
            <input
              type="text"
              placeholder="Full Name *"
              value={guestInfo.name}
              onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
              className="border border-slate-300 p-2.5 w-full rounded-lg outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
            />

            <input
              type="email"
              placeholder="Email Address *"
              value={guestInfo.email}
              onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
              className="border border-slate-300 p-2.5 w-full rounded-lg outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
            />

            <div className="flex gap-2">
              <select
                value={guestInfo.countryCode}
                onChange={(e) => setGuestInfo({ ...guestInfo, countryCode: e.target.value })}
                className="border border-slate-300 p-2.5 rounded-lg outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm w-28"
              >
                <option value="+91">+91</option>
              </select>
              <input
                type="tel"
                placeholder="Phone Number *"
                value={guestInfo.phone}
                onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                className="border border-slate-300 p-2.5 w-full rounded-lg outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
              />
            </div>

            <textarea
              placeholder="Street Address *"
              value={guestInfo.address}
              onChange={(e) => setGuestInfo({ ...guestInfo, address: e.target.value })}
              rows="2"
              className="border border-slate-300 p-2.5 w-full rounded-lg outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm resize-none"
            />

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="City *"
                value={guestInfo.city || ''}
                onChange={(e) => setGuestInfo({ ...guestInfo, city: e.target.value })}
                className="border border-slate-300 p-2.5 w-full rounded-lg outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
              />

              <select
                value={guestInfo.state}
                onChange={(e) => setGuestInfo({ ...guestInfo, state: e.target.value })}
                className="border border-slate-300 p-2.5 w-full rounded-lg outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
              >
                <option value="">Select State *</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Delhi">Delhi</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Jammu & Kashmir">Jammu & Kashmir</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Puducherry">Puducherry</option>
                <option value="Andaman & Nicobar Islands">Andaman & Nicobar Islands</option>
                <option value="Dadra & Nagar Haveli and Daman & Diu">Dadra & Nagar Haveli and Daman & Diu</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Pincode *"
                maxLength={6}
                value={guestInfo.zip}
                onChange={(e) => setGuestInfo({ ...guestInfo, zip: e.target.value.replace(/[^0-9]/g, '') })}
                className="border border-slate-300 p-2.5 w-full rounded-lg outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
              />

              <select
                value={guestInfo.country}
                onChange={(e) => setGuestInfo({ ...guestInfo, country: e.target.value })}
                className="border border-slate-300 p-2.5 w-full rounded-lg outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
              >
                <option value="India">India</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-gray-200 pt-4">
        <p className="text-xs font-semibold text-gray-700 uppercase mb-3">Payment Method</p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <div className="flex gap-3 items-center">
            <input type="radio" id="COD" onChange={() => setPaymentMethod('COD')} checked={paymentMethod === 'COD'} className="accent-orange-500 w-4 h-4" />
            <label htmlFor="COD" className="cursor-pointer font-medium text-gray-900">Cash on Delivery</label>
          </div>
        </div>
      </div>

      {/* Address section - only for logged-in users */}
      {isSignedIn && (
        <div className="my-4 pt-4 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-700 uppercase mb-3">Shipping Address</p>
          {selectedAddress ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{selectedAddress.name}</p>
                  <p className="text-xs text-gray-600 mt-1">{selectedAddress.city}, {selectedAddress.state} - {selectedAddress.zip}, India</p>
                </div>
                <button onClick={() => setSelectedAddress(null)} className="text-orange-600 hover:text-orange-700">
                  <SquarePenIcon size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div>
              {addressList.length > 0 && (
                <select
                  className="border border-gray-300 p-2.5 w-full mb-2 outline-none rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  onChange={(e) => setSelectedAddress(addressList[e.target.value])}
                >
                  <option value="">Select Address</option>
                  {addressList.map((address, index) => (
                    <option key={index} value={index}>{address.name}, {address.city}, {address.state}</option>
                  ))}
                </select>
              )}

              <button className="flex items-center gap-1.5 text-orange-600 hover:text-orange-700 text-sm font-semibold" onClick={() => setShowAddressModal(true)}>
                <PlusIcon size={16} /> Add New Address
              </button>
            </div>
          )}
        </div>
      )}

      <div className="my-4 py-4 border-y border-gray-200">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold text-gray-900">{currency} {Number(totalPrice).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="font-semibold">
              <Protect plan={'plus'} fallback={<span className="text-gray-900">{currency}{shippingFee.toLocaleString()}</span>}>
                <span className="text-green-600">Free</span>
              </Protect>
            </span>
          </div>

          {coupon && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Coupon ({coupon.discountType === 'percentage' ? `${coupon.discount}%` : `${currency}${coupon.discount}`})</span>
              <span className="font-semibold text-green-600">-{currency}{coupon.discountType === 'percentage' ? (coupon.discount / 100 * totalPrice).toFixed(2) : Math.min(coupon.discount, totalPrice).toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="flex justify-between text-sm font-semibold mt-4">
          <span className="text-gray-700">Total</span>
          <span className="text-gray-900">{currency} {(
            Number(totalPrice) + Number(shippingFee) - (coupon ? (coupon.discountType === 'percentage' ? (coupon.discount / 100 * totalPrice) : Math.min(coupon.discount, totalPrice)) : 0)
          ).toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={(e) => toast.promise(handlePlaceOrder(e), { loading: 'Placing Order...' })}
        disabled={loading || (!isSignedIn && !isGuestCheckout)}
        className={`w-full py-3.5 rounded-lg font-bold text-base transition-colors shadow-md hover:shadow-lg uppercase ${
          loading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : (!isSignedIn && !isGuestCheckout ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600')
        }`}
      >
        {loading ? 'Placing Order...' : (!isSignedIn && !isGuestCheckout ? 'Sign In or Use Guest Checkout' : 'Proceed to Checkout')}
      </button>

      {showAddressModal && <AddressModal setShowAddressModal={setShowAddressModal} />}
    </div>
  );
};

export default OrderSummary;

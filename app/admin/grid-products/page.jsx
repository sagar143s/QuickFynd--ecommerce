"use client";

import { useState, useEffect } from 'react';
import ProductSelect from '@/components/ProductSelect';
import axios from 'axios';
import Image from 'next/image';

export default function AdminGridProducts() {
  const [sections, setSections] = useState([
    { title: '', productIds: [] },
    { title: '', productIds: [] }
  ]);
  const [saving, setSaving] = useState(false);


  const [allProducts, setAllProducts] = useState([]);

  // Load grid config and all products on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gridRes, prodRes] = await Promise.all([
          axios.get('/api/admin/grid-products'),
          axios.get('/api/products')
        ]);
        if (Array.isArray(gridRes.data.sections) && gridRes.data.sections.length === 2) {
          setSections(gridRes.data.sections);
        }
        setAllProducts(prodRes.data.products || []);
      } catch (e) {
        // fallback: do nothing
      }
    };
    fetchData();
  }, []);

  const handleTitleChange = (idx, value) => {
    setSections(sections => sections.map((s, i) => i === idx ? { ...s, title: value } : s));
  };
  const handleProductsChange = (idx, productId) => {
    setSections(sections => sections.map((s, i) =>
      i === idx && !s.productIds.includes(productId)
        ? { ...s, productIds: [...s.productIds, productId] }
        : s
    ));
  };
  const removeProduct = (idx, productId) => {
    setSections(sections => sections.map((s, i) =>
      i === idx ? { ...s, productIds: s.productIds.filter(id => id !== productId) } : s
    ));
  };

  const saveGrid = async () => {
    setSaving(true);
    try {
      await axios.post('/api/admin/grid-products', { sections });
      alert('Grid products saved!');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Grid Products Section</h1>
      {sections.map((section, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow p-6 mb-4">
          <label className="block text-sm font-medium mb-2">Section {idx + 1} Title</label>
          <input
            className="w-full border rounded px-3 py-2 mb-4"
            value={section.title}
            onChange={e => handleTitleChange(idx, e.target.value)}
            placeholder={`Title for section ${idx + 1}`}
            maxLength={40}
          />
          <label className="block text-sm font-medium mb-2">Add Products</label>
          <ProductSelect value={''} onChange={id => handleProductsChange(idx, id)} />
          <div className="flex flex-wrap gap-2 mt-3">
            {section.productIds.map(pid => {
              const prod = allProducts.find(p => p.id === pid);
              return (
                <span key={pid} className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2">
                  {prod && prod.images && prod.images[0] && (
                    <Image src={prod.images[0]} alt={prod.name} width={32} height={32} className="rounded-full object-cover" />
                  )}
                  <span>{prod ? (prod.name.length > 30 ? prod.name.slice(0, 30) + '…' : prod.name) : pid}</span>
                  <button type="button" className="text-red-500 ml-2" onClick={() => removeProduct(idx, pid)}>x</button>
                </span>
              );
            })}
          </div>
        </div>
      ))}
      <button
        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold"
        onClick={saveGrid}
        disabled={saving}
      >
        {saving ? 'Saving...' : 'Save Grid Products'}
      </button>
    </div>
  );
}

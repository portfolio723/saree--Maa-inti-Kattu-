"use client";

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Search, X } from 'lucide-react';
import { products as allProducts } from '@/lib/mock-data';
import type { Product } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (query.trim().length > 0) {
      const searchResults = allProducts.filter(product => {
        const searchTerm = query.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.longDescription.toLowerCase().includes(searchTerm) ||
          product.id.toLowerCase().includes(searchTerm)
        );
      });
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleClose = () => {
    setQuery('');
    setResults([]);
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <div className="relative">
                <Search className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search for products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              {query.length > 0 && (
                <div className="max-h-96 overflow-y-auto">
                  {results.length > 0 ? (
                    <ul className="divide-y divide-gray-100">
                      {results.map((product) => (
                        <li key={product.id}>
                          <Link
                            href={`/products/${product.id}`}
                            className="flex items-center gap-4 p-4 hover:bg-gray-50"
                            onClick={handleClose}
                          >
                            <Image
                              src={product.images[0].imageUrl}
                              alt={product.name}
                              width={48}
                              height={60}
                              className="h-16 w-12 flex-none rounded-md object-cover"
                            />
                            <div className="flex-auto">
                              <p className="font-semibold text-gray-900">{product.name}</p>
                              <p className="text-sm text-gray-500">₹{product.price.toFixed(2)}</p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="py-14 px-6 text-center text-sm sm:px-14">
                      <p className="text-gray-500">No products found for &quot;{query}&quot;.</p>
                    </div>
                  )}
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
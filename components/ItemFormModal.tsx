
import React, { useState, useEffect, FormEvent } from 'react';
import { MenuItem, FoodCategory } from '../types';
import Modal from './ui/Modal';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';

interface ItemFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (item: Omit<MenuItem, 'id'> | MenuItem) => void;
    item: MenuItem | null;
}

const ItemFormModal: React.FC<ItemFormModalProps> = ({ isOpen, onClose, onSave, item }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: FoodCategory.SNACK,
        isAvailable: true,
        imageUrl: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name,
                price: item.price.toString(),
                category: item.category,
                isAvailable: item.isAvailable,
                imageUrl: item.imageUrl,
            });
        } else {
            setFormData({
                name: '',
                price: '',
                category: FoodCategory.SNACK,
                isAvailable: true,
                imageUrl: `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400`,
            });
        }
        setErrors({});
    }, [item, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required.';
        if (!formData.price) {
            newErrors.price = 'Price is required.';
        } else if (isNaN(Number(formData.price)) || Number(formData.price) < 0) {
            newErrors.price = 'Price must be a valid number.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        
        const dataToSave = {
            name: formData.name,
            price: Number(formData.price),
            category: formData.category,
            isAvailable: formData.isAvailable,
            imageUrl: formData.imageUrl || `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400`,
        };

        if (item) {
            onSave({ ...dataToSave, id: item.id });
        } else {
            onSave(dataToSave);
        }
    };

    return (
        <Modal title={item ? 'Edit Menu Item' : 'New Menu Item'} isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Dish Name"
                    id="name"
                    name="name"
                    placeholder="e.g. Paneer Makhani"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    required
                />
                <div className="relative">
                    <Input
                        label="Price (₹)"
                        id="price"
                        name="price"
                        type="number"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={handleChange}
                        error={errors.price}
                        required
                        min="0"
                        step="1"
                    />
                </div>
                 <Input
                    label="Image URL"
                    id="imageUrl"
                    name="imageUrl"
                    placeholder="Paste unsplash or direct image link"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    error={errors.imageUrl}
                />
                <Select
                    label="Category"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    {Object.values(FoodCategory).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </Select>
                
                {/* Robust Availability Toggle */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-900">Availability Status</label>
                    <label className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100 cursor-pointer group hover:bg-white hover:border-primary-100 transition-all">
                        <span className="text-sm font-bold text-gray-700">Currently Available for Order</span>
                        <div className="relative inline-flex items-center">
                            <input
                                id="isAvailable"
                                name="isAvailable"
                                type="checkbox"
                                checked={formData.isAvailable}
                                onChange={handleChange}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </div>
                    </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100">
                    <Button type="submit" className="flex-1 rounded-2xl py-4 font-bold text-base shadow-lg shadow-primary-200">
                        {item ? 'Update Menu Item' : 'Create Menu Item'}
                    </Button>
                    <Button type="button" variant="secondary" onClick={onClose} className="rounded-2xl py-4 font-bold text-gray-500 hover:text-gray-700">
                        Cancel
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default ItemFormModal;

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import contactService from '../services/ContactService';

export default function ContactForm() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await contactService.sendMail(formData);
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h1 className="text-2xl font-semibold mb-4 text-center">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
      {status === 'success' && (
        <p className="mt-4 text-green-500 text-center">
          Message sent successfully!
        </p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-red-500 text-center">
          Failed to send the message. Please try again.
        </p>
      )}
      <button
        onClick={() => history.goBack()}
        className="btn mt-3 bg-gray-500 hover:bg-gray-700"
      >
        Back
      </button>
    </div>
  );
}

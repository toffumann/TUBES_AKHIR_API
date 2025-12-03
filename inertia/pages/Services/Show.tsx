// pages/Checkout/Index.tsx
import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import Layout from '../../layouts/Layout';

export default function CheckoutIndex() {
  const [serviceData, setServiceData] = useState<{
    id: number;
    nama_service: string;
    harga: number;
  } | null>(null);
  
  const [catatan, setCatatan] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Ambil data dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('service_id');
    const namaService = urlParams.get('nama_service');
    const harga = urlParams.get('harga');

    if (serviceId && namaService && harga) {
      setServiceData({
        id: parseInt(serviceId),
        nama_service: decodeURIComponent(namaService),
        harga: parseInt(harga)
      });
    }
  }, []);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!serviceData) return;
    
    try {
      setIsLoading(true);
      
      await router.post('/projects', {
        id_service: serviceData.id,
        catatan_user: catatan,
        status_project: 'Baru',
        tanggal_mulai: new Date().toISOString().split('T')[0]
      });
      
      // Redirect ke halaman konfirmasi
      router.visit('/order-confirmation', {
        data: {
          service_name: serviceData.nama_service,
          harga: serviceData.harga,
          catatan: catatan
        }
      });
      
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!serviceData) {
    return (
      <Layout title="Data Tidak Ditemukan">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Data tidak ditemukan</h1>
            <p className="text-gray-600 mb-6">Silakan pilih layanan terlebih dahulu</p>
            <a 
              href="/layanan" 
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700"
            >
              ← Kembali ke Layanan
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Checkout - ${serviceData.nama_service}`}>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <p className="text-gray-600 mt-2">Lengkapi informasi untuk memesan layanan</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ringkasan Pesanan */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Ringkasan Pesanan</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{serviceData.nama_service}</h3>
                      <p className="text-sm text-gray-600 mt-1">Layanan desain profesional</p>
                    </div>
                    <span className="font-bold text-gray-900">
                      {formatRupiah(serviceData.harga)}
                    </span>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-purple-600">
                        {formatRupiah(serviceData.harga)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Informasi Proyek</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Catatan untuk Proyek (Opsional)
                    </label>
                    <textarea
                      value={catatan}
                      onChange={(e) => setCatatan(e.target.value)}
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Deskripsikan kebutuhan spesifik, referensi desain, atau catatan khusus..."
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Contoh: "Saya ingin desain dengan warna biru dan orange, dengan tema modern dan minimalis"
                    </p>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full ${isLoading ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'} text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-300`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Memproses...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Konfirmasi Pesanan
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">📋 Proses Pemesanan</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold mr-3">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Pilih Layanan</p>
                      <p className="text-sm text-gray-600">Selesai</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Checkout</p>
                      <p className="text-sm text-gray-600">Langkah saat ini</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center font-bold mr-3">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-gray-400">Konfirmasi</p>
                      <p className="text-sm text-gray-500">Diskusi dengan tim</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-blue-900 mb-2">📞 Butuh Bantuan?</h3>
                <p className="text-blue-700 text-sm mb-4">
                  Hubungi kami untuk pertanyaan atau konsultasi.
                </p>
                <a 
                  href="https://wa.me/6281234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block bg-green-500 hover:bg-green-600 text-white text-center py-2 px-4 rounded-lg font-medium"
                >
                  WhatsApp Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
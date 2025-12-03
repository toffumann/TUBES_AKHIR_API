// pages/OrderConfirmation/Index.tsx
import { useEffect, useState } from 'react';
import Layout from '../../Layouts/Layout';

interface OrderData {
  service_name: string;
  harga: number;
  catatan: string;
  order_date: string;
}

export default function OrderConfirmation() {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi data order berhasil
    const urlParams = new URLSearchParams(window.location.search);
    const serviceName = urlParams.get('service_name') || 'Layanan Desain';
    const harga = urlParams.get('harga') || '0';
    const catatan = urlParams.get('catatan') || '';

    setOrder({
      service_name: decodeURIComponent(serviceName),
      harga: parseInt(harga),
      catatan: decodeURIComponent(catatan),
      order_date: new Date().toISOString()
    });
    
    setLoading(false);

    // Auto-clear data setelah beberapa saat
    const timer = setTimeout(() => {
      // Clear URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Layout title="Memproses...">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memproses pesanan Anda...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Konfirmasi Pesanan">
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header Sukses */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pesanan Berhasil! 🎉</h1>
            <p className="text-gray-600">
              Terima kasih telah memesan layanan kami. Tim kami akan segera menghubungi Anda.
            </p>
          </div>

          {/* Detail Pesanan */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Detail Pesanan</h2>
            
            <div className="space-y-6">
              {/* Service Info */}
              <div className="flex justify-between items-start border-b pb-4">
                <div>
                  <h3 className="font-medium text-gray-900">{order?.service_name}</h3>
                  <p className="text-sm text-gray-500 mt-1">Layanan Desain</p>
                </div>
                <span className="font-bold text-gray-900">
                  {formatRupiah(order?.harga || 0)}
                </span>
              </div>
              
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Tanggal Pesanan</p>
                  <p className="font-medium text-gray-900">{formatDate(order?.order_date || '')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    Menunggu Konfirmasi
                  </span>
                </div>
              </div>
              
              {/* Catatan */}
              {order?.catatan && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Catatan Anda</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{order.catatan}</p>
                  </div>
                </div>
              )}
              
              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total Pembayaran</span>
                  <span className="text-2xl font-bold text-purple-600">
                    {formatRupiah(order?.harga || 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Selanjutnya</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold mr-4">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Konfirmasi dari Admin</h3>
                  <p className="text-gray-600 text-sm">
                    Admin akan menghubungi Anda dalam 1x24 jam untuk konfirmasi detail proyek
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold mr-4">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Pembayaran</h3>
                  <p className="text-gray-600 text-sm">
                    Setelah diskusi, Anda akan menerima instruksi pembayaran
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold mr-4">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Pengerjaan Proyek</h3>
                  <p className="text-gray-600 text-sm">
                    Desainer akan mulai mengerjakan setelah pembayaran dikonfirmasi
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="/my-projects"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
            >
              👁️ Lihat Status Proyek
            </a>
            <a 
              href="/layanan"
              className="flex-1 bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg text-center hover:bg-gray-50 transition-colors"
            >
              🛒 Pesan Layanan Lain
            </a>
            <a 
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
            >
              💬 Hubungi Admin via WhatsApp
            </a>
          </div>

          {/* Info Kontak */}
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>Pertanyaan? Hubungi kami:</p>
            <p className="mt-1">
              📧 support@desainajadulu.com | 
              📱 +62 812-3456-7890 |
              🕐 Senin - Jumat, 09:00 - 17:00 WIB
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';


// ▼▼▼ Modalコンポーネント▼▼▼
// Modalコンポーネントのstyleを改善した例
// 1. アニメーションが見えない原因は「即時非表示」だった
// モーダルを閉じるときにすぐにコンポーネントを null にすると（isOpen === false になると即座に表示をやめていた）ため、
// フェードアウトやズームアウトのアニメーションが始まる前に、画面からモーダルが消えてしまっていた。
// visible という状態を作ってモーダル自体はアニメーション終了まで残し、
// アニメーション終了後（0.6秒後）に visible = false にして非表示に切り替えた
// ため、アニメーションが見えるようになりました。

function Modal({ isOpen, onClose, children }) {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 600); // 0.6秒待って非表示
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          animation: `${isOpen ? 'fadeInZoomIn' : 'fadeOutZoomOut'} 0.6s forwards`,
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            position: 'relative',
            width: '90%',
            maxWidth: 800,
            maxHeight: '90%',
            backgroundColor: '#111',
            borderRadius: 12,
            padding: '1rem 2rem',
            color: '#fff',
            overflowY: 'auto',
            boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              zIndex: 10,
              fontSize: 24,
              border: 'none',
              background: 'rgba(0,0,0,0.5)',
              color: '#fff',
              cursor: 'pointer',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0,
            }}
            aria-label="Close modal"
          >
            ×
          </button>
          {children}
        </div>
      </div>
      <style>{`
        @keyframes fadeInZoomIn {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fadeOutZoomOut {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.95);
          }
        }
      `}</style>
    </>
  );
}

// ▲▲▲ ここまでがモーダルウィンドウの本体コンポーネントです ▲▲▲



export default function NasaPhoto() {
  const { t } = useTranslation();

  const today = new Date();
  const formatDate = (d) => d.toISOString().slice(0, 10);
  const defaultEndDate = formatDate(today);
  const defaultStartDate = formatDate(new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000));

  const [photos, setPhotos] = useState([]);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=IlxwQ6YKtw72GjwvxACC2fpoE8c2UkXAFba0RJjz&start_date=${startDate}&end_date=${endDate}`
      );
      const data = await res.json();
      setPhotos(Array.isArray(data) ? data.sort((a, b) => b.date.localeCompare(a.date)) : [data]);
    } catch (err) {
      console.error('API fetch error:', err);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const openModal = (photo) => {
    setModalContent(photo);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: '1rem 2rem', color: '#fff' }}>
      <LanguageSwitcher />
      <h1 style={{ textAlign: 'center' }}>{t('nasaPhoto.title')}</h1>

       <div style={{ marginBottom: 16, textAlign: 'center' }}>
         <label>
           {t('nasaPhoto.start_date')}:{' '}
           <input type="date" value={startDate} max={endDate} onChange={(e) => setStartDate(e.target.value)} />
         </label>
         <label style={{ marginLeft: '1rem' }}>
           {t('nasaPhoto.end_date')}:{' '}
           <input type="date" value={endDate} min={startDate} max={defaultEndDate} onChange={(e) => setEndDate(e.target.value)} />
         </label>
 {/*         <button onClick={fetchPhotos} style={{ marginLeft: '1rem', padding: '6px 12px', cursor: 'pointer', backgroundColor: '#1e90ff', color: 'white', border: 'none', borderRadius: 4 }}> */}
         <button onClick={fetchPhotos} style={{ marginLeft: '1rem', padding: '6px 12px', cursor: 'pointer', backgroundColor: 'white', color: 'black', border: 'none', borderRadius: 4 }}>
           {t('nasaPhoto.search')}
         </button>
       </div>

      {loading ? (
        <p style={{ textAlign: 'center' }}>{t('nasaPhoto.loading')}</p>
      ) : photos.length === 0 ? (
        <p style={{ textAlign: 'center' }}>{t('nasaPhoto.no_photos')}</p>
      ) : (
        // ▼▼▼ ここからが「写真ギャラリーのレイアウト」を定義している部分です ▼▼▼
        // このdivのstyleが、画像一覧の並び方（横に並べて折り返すなど）を決めています。
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            justifyContent: 'center',
            padding: '16px 0',
          }}
        >
          {/* photos配列の各データを元に、画像カードを繰り返し表示します */}
          {photos.map((photo) => (
            // ▼▼▼ 個々の写真カードのスタイルです。カードの幅や枠線などを決めています ▼▼▼
            <div
              key={photo.date}
              style={{
                width: '300px',
                border: '1px solid #444',
                borderRadius: 8,
                backgroundColor: '#111',
                boxShadow: '0 2px 8px rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                overflow: 'hidden',
              }}
              // このカードがクリックされると、openModal関数が呼ばれてモーダルが開きます
              onClick={() => openModal(photo)}
            >
              {/* カード内の画像やタイトルを表示 */}
              <div style={{ width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#222' }}>
                {photo.media_type === 'image' ? (
                  <img src={photo.url} alt={photo.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ height: '100%', width: '100%', backgroundColor: '#222', color: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    🎥 {t('video_placeholder')}
                  </div>
                )}
              </div>
              <div style={{ padding: '0.5rem 1rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{photo.title}</h3>
                <p style={{ fontSize: 12, color: '#aaa', margin: 0 }}>{photo.date}</p>
              </div>
            </div>
          ))}
        </div>
        // ▲▲▲ ここまでが「写真ギャラリーのレイアウト」部分です ▲▲▲
      )}

      {/* ▼▼▼ ここからが「モーダル画像」を表示する部分です ▼▼▼ */}
      {/* isOpenがtrueの時に<Modal>コンポーネントが表示され、その中にモーダルの内容（modalContent）が渡されます。 */}
      <Modal isOpen={modalOpen} onClose={closeModal}>
        {/* modalContentにデータが存在する場合に中身を表示します */}
        {modalContent && (
          <div>
{/*             <h2>{modalContent.title}</h2><p><strong>{modalContent.date}</strong></p> */}
            <h2>{modalContent.title}  {modalContent.date}</h2>


            
            {/* ▼▼▼ "モーダル画像" または動画が実際に表示される場所です ▼▼▼ */}
            {modalContent.media_type === 'image' ? (
              // 選択された写真が画像の場合
              <img
                src={modalContent.url}
                alt={modalContent.title}
                style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: '8px',overflow: 'hidden' }}
              />
            ) : (
              // 選択されたものが動画の場合
              <iframe
                title={modalContent.title}
                src={modalContent.url}
                width="100%"
                height="400px"
                allowFullScreen
            	  frameBorder="0"
            	></iframe>
            )}
            {/* ▲▲▲ "モーダル画像" または動画が実際に表示される場所です ▲▲▲ */}
            <p style={{ marginTop: '1rem', color: '#ccc' }}>{modalContent.explanation}</p>
          </div>
        )}
      </Modal>
      {/* ▲▲▲ ここまでが「モーダル画像」を表示する部分です ▲▲▲ */}

    </div>
  );

}




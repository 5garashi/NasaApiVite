import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // 翻訳フックを追加
import LanguageSwitcher from './LanguageSwitcher';
import './Home.css';


export default function Home() {
  const { t } = useTranslation(); // 翻訳関数を取得

  return (
    <div className="home">
      <LanguageSwitcher />
      <h1>{t('home.title')}</h1>
      <h2>{t('home.description')}</h2>

      <h2>
        <Link to="/nasa-photo" style={{ textDecoration: 'none' }}>
          <button
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              borderRadius: '5px',
              border: 'gray 1px solid',
              backgroundColor: '#f0f0f0',
              color: 'black',
            }}
          >
            {t('home.link')}
          </button>
          
        </Link>
      </h2>
      <h2>{t('home.powerdBy')}</h2>

    </div>
  );
}

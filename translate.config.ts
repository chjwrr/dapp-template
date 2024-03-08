// translate.config.js
import { Lang } from 'language-translate/types';
import { defineConfig } from 'language-translate/utils';

export default defineConfig({
  proxy: {
    host: '127.0.0.1',
    port: 7890,
  },
  fromLang: Lang.en,
  fromPath: 'public/diff/en-US.json',
  translate: [
    {
      label: '将结果翻译到public/diff文件夹下',
      targetConfig: [
        {
          targetLang: Lang.ar,
          outPath: 'public/diff/ar-AE.json',
        },
        {
          targetLang: Lang.bn,
          outPath: 'public/diff/bn-BD.json',
        },
        {
          targetLang: Lang.de,
          outPath: 'public/diff/de-DE.json',
        },
        {
          targetLang: Lang.es,
          outPath: 'public/diff/es-ES.json',
        },
        {
          targetLang: Lang.fr,
          outPath: 'public/diff/fr-FR.json',
        },
        {
          targetLang: Lang.hi,
          outPath: 'public/diff/hi-IN.json',
        },
        {
          targetLang: Lang.id,
          outPath: 'public/diff/id-ID.json',
        },
        {
          targetLang: Lang.ja,
          outPath: 'public/diff/ja-JP.json',
        },
        {
          targetLang: Lang.ko,
          outPath: 'public/diff/ko-KR.json',
        },
        {
          targetLang: Lang.ms,
          outPath: 'public/diff/ms-MY.json',
        },
        {
          targetLang: Lang.no,
          outPath: 'public/diff/no-NO.json',
        },
        {
          targetLang: Lang.pt,
          outPath: 'public/diff/pt-PT.json',
        },
        {
          targetLang: Lang.ru,
          outPath: 'public/diff/ru-RU.json',
        },
        {
          targetLang: Lang.th,
          outPath: 'public/diff/th-TH.json',
        },
        {
          targetLang: Lang.vi,
          outPath: 'public/diff/vi-VN.json',
        },
        {
          targetLang: Lang['zh-CN'],
          outPath: 'public/diff/zh-CN.json',
        },
        {
          targetLang: Lang['zh-TW'],
          outPath: 'public/diff/zh-TW.json',
        },
      ]
    }
  ]
})
// Project Data Configuration
// This file contains all the project information for the portfolio

const projectData = {
    'ntust-freshman': {
        title: '台科新生懶人包 For Freshman in NTUST',
        features: [
            '新生入學資訊整理',
            '校園生活實用指南',
            '課程選課建議與心得分享',
            '社團活動資訊彙整',
            '學長姐經驗談與建議'
        ],
        technologies: ['NotionNext', 'Markdown'],
        links: [
            { type: 'visit', url: 'https://ntust.merlinkuo.tw/', icon: 'fas fa-external-link-alt' }
        ],
        details: '這個項目旨在幫助台科大新生更好地了解校園環境和學習資源。網站包含了從入學準備到日常生活的各種實用資訊，是新生必備的數位指南。'
    },
    'short-url': {
        title: 'Short URL System',
        features: [
            '快速網址縮短服務',
            '自定義別名、網域功能'
        ],
        technologies: ['React.js', 'Firebase Firestore', 'Firebase Authentication'],
        links: [
            { type: 'visit', url: 'https://s.merlinkuo.tw/', icon: 'fas fa-external-link-alt' },
            { type: 'github', url: 'https://github.com/yuchen5564/short-url-system', icon: 'fab fa-github' }
        ],
        details: '這是一個簡易的短網址服務，採用React.js並搭配Firebase Firestore進行資料存儲。適合個人或小團隊使用。'
    },
    'current-time': {
        title: 'Current Time (with Text Editor)',
        features: [
            '即時時間顯示',
            '內建文字編輯器',
            '簡潔直觀的使用介面',
            '響應式設計支援'
        ],
        technologies: ['HTML', 'CSS', 'JavaScript'],
        links: [
            { type: 'visit', url: 'https://time.merlinkuo.tw/', icon: 'fas fa-external-link-alt' },
            { type: 'github', url: 'https://github.com/yuchen5564/time', icon: 'fab fa-github' }
        ],
        details: '結合了時間查看和文字提示顯示的功能，非常適合需要同時顯示時間和提示相關注意事項的使用者。'
    },
    'countdown-timer': {
        title: 'Simple Countdown Timer',
        features: [
            '靈活的倒數計時設定',
            '視覺化進度顯示',
            '多種提醒方式'
        ],
        technologies: ['HTML', 'CSS', 'JavaScript'],
        links: [
            { type: 'visit', url: 'https://countdown.merlinkuo.tw/', icon: 'fas fa-external-link-alt' },
            { type: 'github', url: 'https://github.com/yuchen5564/countdown-timer', icon: 'fab fa-github' }
        ],
        details: '一個功能齊全的倒數計時器應用，適用於各種需要時間管理的場景。介面簡潔美觀，操作直觀，支援多種提醒方式。'
    },
    'bulletin-system': {
        title: 'Bulletin System',
        features: [
            '公告發佈與管理',
            '支援圖片上傳'
        ],
        technologies: ['React.js','Firebase Firestore', 'Firebase Authentication', 'Firebase Storage'],
        links: [
            { type: 'visit', url: 'https://bulletin.merlinkuo.tw/', icon: 'fas fa-external-link-alt' },
            { type: 'github', url: 'https://github.com/yuchen5564/bulletin-system', icon: 'fab fa-github' }
        ],
        details: '專為小型組織設計的公告系統，提供完整的公告管理功能。支援圖片顯示，讓組織內部資訊傳達更加高效。'
    },
    'attendance-system': {
        title: 'Attendance System',
        features: [
            '線上打卡簽到/簽退',
            '出勤記錄統計',
            '請假申請管理',
            '月度出勤報表',
            '管理員後台系統'
        ],
        technologies: ['React.js', 'Vite', 'Firebase Firestore', 'Firebase Authentication'],
        links: [
            { type: 'visit', url: 'https://hrsys.merlinkuo.tw/', icon: 'fas fa-external-link-alt' },
            { type: 'github', url: 'https://github.com/yuchen5564/attendance-system', icon: 'fab fa-github' }
        ],
        details: '一個完整的員工出勤管理系統，包含打卡、請假、統計等核心功能。系統設計考慮了實際使用需求，提供直觀的操作介面和詳細的數據分析。'
    }
};

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = projectData;
}
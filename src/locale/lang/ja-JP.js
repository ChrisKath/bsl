import setLang from '../lang'

const lang = {
  i: {
    locale: 'ja-JP',
    lang: '日本語',
    continent: 'Asia Pacific',
    select: {
      placeholder: '選んでください',
      noMatch: 'マッチするデータなし',
      loading: 'ロード中'
    },
    table: {
      noDataText: 'データなし',
      noFilteredDataText: 'スクリーニングしたデータなし',
      confirmFilter: 'スクリーニング',
      resetFilter: 'リセット',
      clearFilter: '全部'
    },
    datepicker: {
      selectDate: '日時を選んでください',
      selectTime: '時間を選んでください',
      startTime: 'スタート時間',
      endTime: '終了時間',
      clear: 'クリーア',
      ok: '確定',
      datePanelLabel: '[yyyy年] [m月]',
      month: '月',
      month1: '1 月',
      month2: '2 月',
      month3: '3 月',
      month4: '4 月',
      month5: '5 月',
      month6: '6 月',
      month7: '7 月',
      month8: '8 月',
      month9: '9 月',
      month10: '10 月',
      month11: '11 月',
      month12: '12 月',
      year: '年',
      weekStartDay: '0',
      weeks: {
        sun: '日',
        mon: '月',
        tue: '火',
        wed: '水',
        thu: '木',
        fri: '金',
        sat: '土'
      },
      months: {
        m1: '1月',
        m2: '2月',
        m3: '3月',
        m4: '4月',
        m5: '5月',
        m6: '6月',
        m7: '7月',
        m8: '8月',
        m9: '9月',
        m10: '10月',
        m11: '11月',
        m12: '12月'
      }
    },
    transfer: {
      titles: {
        source: 'ソースリスト',
        target: 'ターゲットリスト'
      },
      filterPlaceholder: '検索内容を入力ください',
      notFoundText: '内容が見つかってなかった'
    },
    modal: {
      okText: '確定',
      cancelText: 'キャンセル'
    },
    poptip: {
      okText: '確定',
      cancelText: 'キャンセル'
    },
    page: {
      prev: '前へ',
      next: '次へ',
      total: '全部',
      item: '件',
      items: '件',
      prev5: '前の５ページへ',
      next5: '次の５ページへ',
      page: '件/ページ',
      goto: '',
      p: 'ページ目へ'
    },
    rate: {
      star: '点',
      stars: '点'
    },
    tree: {
      emptyText: 'データなし'
    },
    menu: {
      create: 'を作成',
      createlink: 'リンクを作成',
      dashboard: 'ダッシュボード',
      account: 'マイアカウント'
    },
    form: {
      title: {
        auth: 'ようこそ',
        resetPass: 'パスワードを忘れた場合',
        resetInfo: '会員情報入力、パスワード再設定'
      },
      note: {
        one: 'メールアドレス形式でのログインの方は両方の入力欄にメールアドレスを入力してください。',
        two: 'ご本人様の確認が取れない場合は、パスワード再設定再発行はできません。'
      },
      user: 'アカウント',
      pass: 'パスワード',
      // search: '検索',
      search: 'サーチ',
      longurl: '長いURL ペースト',
      logged: '私をログインさせておく',
      forgot: 'パスワードを忘れた方はこちらへ',
      registeredEmail: '登録済みの メールアドレス',
      button: {
        signin: 'ログイン',
        signout: 'ログアウト',
        submit: '提出する',
        save: '保存',
        edit: '編集',
        confirm: '確認',
        cancel: 'キャンセル',
        clear: '明晰',
        reset: 'セットし直す'
      }
    },
    notice: {
      info: 'This is a info tip',
      success: 'サクセス',
      warning: '警告!',
      error: 'エラー!!'
    }
  }
}

setLang(lang)

export default lang

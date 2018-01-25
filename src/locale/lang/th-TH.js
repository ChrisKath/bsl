import setLang from '../lang'

const lang = {
  i: {
    locale: 'th-TH',
    lang: 'ภาษาไทย',
    continent: 'Asia Pacific',
    select: {
      placeholder: 'ตัวเลือก',
      noMatch: 'ข้อมูลไม่ตรงกัน',
      loading: 'กำลังโหลด'
    },
    table: {
      noDataText: 'ไม่พบข้อมูล',
      noFilteredDataText: 'ไม่พบตัวกรองข้อมูล',
      confirmFilter: 'ยืนยัน',
      resetFilter: 'รีเซ็ต',
      clearFilter: 'รีเซ็ตทั้งหมด'
    },
    datepicker: {
      selectDate: 'เลือกวัน',
      selectTime: 'เลือกเวลา',
      startTime: 'เริ่มเวลา',
      endTime: 'สิ้นสุดเวลา',
      clear: 'ล้างข้อมูล',
      ok: 'ตกลง',
      datePanelLabel: '[mmmm] [yyyy]',
      month: 'เดือน',
      month1: 'มกราตม',
      month2: 'กุมภาพันธ์',
      month3: 'มีนาคม',
      month4: 'เมษายน',
      month5: 'พฤษภาคม',
      month6: 'มิถุนายน',
      month7: 'กรกฎาคม',
      month8: 'สิงหาคม',
      month9: 'กันยายน',
      month10: 'ตุลาคม',
      month11: 'พฤศจิกายน',
      month12: 'ธันวาคม',
      year: 'ปี',
      weekStartDay: '0',
      weeks: {
        sun: 'อาทิตย์',
        mon: 'จันทร์',
        tue: 'อังคาร',
        wed: 'พุธ',
        thu: 'พฤหัสบดี',
        fri: 'ศุกร์',
        sat: 'เสาร์'
      },
      months: {
        m1: 'ม.ค.',
        m2: 'ก.พ.',
        m3: 'มี.ค.',
        m4: 'เม.ย.',
        m5: 'พ.ค.',
        m6: 'มิ.ย.',
        m7: 'ก.ค.',
        m8: 'ส.ค.',
        m9: 'ก.ย.',
        m10: 'ต.ค.',
        m11: 'พ.ย.',
        m12: 'ธ.ค.'
      }
    },
    transfer: {
      titles: {
        source: 'แหล่งข้อมูล',
        target: 'เป้าหมาย'
      },
      filterPlaceholder: 'ค้นหาที่นี้',
      notFoundText: 'ค้นหาไม่พบ'
    },
    modal: {
      okText: 'ตกลง',
      cancelText: 'ยกเลิก'
    },
    poptip: {
      okText: 'ตกลง',
      cancelText: 'ยกเลิก'
    },
    page: {
      prev: 'หน้าก่อน',
      next: 'หน้าถัดไป',
      total: 'ทั้งหมด',
      item: 'ไอเทม',
      items: 'ไอเทม',
      prev5: 'ก่อน 5 หน้า',
      next5: 'ถัดไป 5 หน้า',
      page: '/หน้า',
      goto: 'ไปยัง',
      p: 'หน้า'
    },
    rate: {
      star: 'ดาว',
      stars: 'ดาว'
    },
    tree: {
      emptyText: 'ไม่พบข้อมูล'
    },
    menu: {
      create: 'สร้าง',
      createlink: 'สร้างลิงก์',
      dashboard: 'แผงควบคุม',
      account: 'จัดการบัญชี',
      manageTag: 'จัดการแท็ก',
      manageAccounts: 'จัดการบัญชีสมาชิก'
    },
    form: {
      title: {
        auth: 'การยืนยันตัวตน',
        resetPass: 'ลืมรหัสผ่าน',
        resetInfo: 'ยืนยันบัญชีของคุณ เพื่อตั้งรหัสผ่านใหม่'
      },
      note: {
        one: 'ถ้าคุณใช้ emaill address ในการเข้าสู่ระบบ, คุณสามารถกรอก email address ได้ทั้ง 2 ช่อง',
        two: 'ถ้าคุณไม่สามารถยืนยันบัญชีได้, คุณจะไม่สามารถตั้งรหัสผ่านใหม่ได้'
      },
      display: 'ชื่อเล่น',
      email: 'ที่อยู่อีเมล',
      user: 'ชื่อผู้ใช้',
      pass: 'รหัสผ่าน',
      search: 'ค้นหาลิงก์',
      longurl: 'วางลิงก์ยาวที่นี่',
      logged: 'ให้ฉันคงอยู่ในระบบ',
      forgot: 'ลืมรหัสผ่าน?',
      registeredEmail: 'อีเมลที่ใช้ลงทะเบียน',
      root: 'ผู้สร้าง',
      admin: 'ผู้ดูแลระบบ',
      member: 'สมาชิก',
      button: {
        signin: 'เข้าสู่ระบบ',
        signout: 'ออกจากระบบ',
        submit: 'ส่งข้อมูล',
        save: 'บันทึก',
        confirm: 'ยืนยัน',
        cancel: 'ยกเลิก',
        clear: 'ล้างข้อมูล',
        back: 'ย้อนกลับ',
        reset: 'รีเซ็ต',
        enable: 'เปิดการใช้งาน',
        on: 'เปิด',
        off: 'ปิด',
        edit: 'แก้ไข',
        remove: 'ลบทิ้ง',
        copy: 'คักลอก'
      }
    },
    title: {
      tag: 'แท็ก',
      click: 'กดฉันสิๆ',
      clickTimeline: 'ประวัติการคลิกส์',
      created: 'วันที่ถูกสร้าง',
      updated: 'วันที่ถูกแก้ไขล่าสุด',
      createAccount: 'สร้างบัญชีผู้ใช้ใหม่'
    },
    notice: {
      info: 'มีบางอบ่างเกิดขึ้น',
      success: 'สำเร็จ',
      warning: 'มีปัญหาแล้ว!',
      error: 'ผิดพลาดโหดร้าย!!'
    }
  }
}

setLang(lang)

export default lang

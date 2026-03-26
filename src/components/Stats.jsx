import React, { useEffect } from 'react'

export default function Stats() {
     useEffect(() => {
    document.title = "SETAS | الإحصائيات";
  }, []);
  return (
    <div>
        <h1>الإحصائيات</h1>
    </div>
  )
}

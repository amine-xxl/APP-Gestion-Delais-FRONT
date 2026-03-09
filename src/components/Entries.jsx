import { useEffect, useState } from 'react'

export default function Entries() {
    useEffect(() => {
        document.title = "SETAS | الـمـدخـلات";
    }, []);
    const [limiteRecu, setLimiteRecu] = useState('');
    const [dateReponse, setDateReponse] = useState('');
    const dateDiff = limiteRecu && dateReponse ? Math.round((new Date(limiteRecu) - new Date(dateReponse)) / (1000 * 60 * 24 * 60)) : "";
    return (
        <div className='container w-100 mx-auto' dir='rtl'>
            <form action="">
                <fieldset>
                    <legend>اضافة مراسلة جديدة</legend>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="n_garde" className="form-label ">رقم الحراسة</label>
                                <input type="text" className="form-control text-start" id="n_garde" name='n_garde' placeholder="1234/A/1234/1234"
                                    pattern="\d{4}/[A-Z]/\d{4}/\d{1,4}" dir='ltr' required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="date_garde" className="form-label">تاريخها</label>
                                <input type="date" className="form-control" id="date_garde" name='date_garde' required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="sujet" className="form-label">موضوعها</label>
                            <textarea name="sujet" id="sujet" className="form-control" rows="5" cols="50" required></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="date_recu" className="form-label ">تاريخ الاستلام</label>
                                <input type="date" className="form-control" id="date_recu" name='date_recu' required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="limite_recu" className="form-label">اجل الاستلام</label>
                                <input type="date" className="form-control" id="limite_recu" name='limite_recu' value={limiteRecu} onChange={(e) => setLimiteRecu(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="reponse" className='form-label'>الجواب</label>
                            <textarea name="reponse" id="reponse" cols="50" rows="5" className='form-control'></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="n_reponse" className="form-label">رقم الجواب</label>
                                <input type="text" name="n_reponse" id="n_reponse" className="form-control text-start" placeholder="1234/A/1234/1234" pattern="\d{4}/[A-Z]/\d{4}/\d{1,4}" dir="ltr" />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="date_reponse" className="form-label">تاريخ الجواب</label>
                                <input type="date" name="date_reponse" id="date_reponse" className="form-control" value={dateReponse} onChange={(e) => setDateReponse(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <fieldset className='mb-3'>
                        <legend>حساب الاجلات</legend>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="delais_recu" className="form-label">اجل التسليم</label>
                                    <input type="text" name="delais_recu" id="delais_recu" className="form-control text-start" dir='ltr' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="dateDiff" className='form-label'>النجاعة</label>
                                    <input type="text" name="dateDiff" id="dateDiff" readOnly className={`form-control text-start ${dateDiff === "" ? "" : dateDiff > 0 ? "text-danger" : "text-success"}`} value={dateDiff === '' ? '' : `${dateDiff > 0 ? "+" : ""}${dateDiff} ايام`} />                                
                                        </div>
                            </div>
                        </div>
                    </fieldset>
                    <button type="submit" className="btn btn-success text-align-center">حفظ</button>
                </fieldset>
            </form>
        </div>
    )
}

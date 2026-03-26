import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addCourrier } from '../store/courrierSlice';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

export default function Entries() {
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = "SETAS | الـمـدخـلات";
    }, []);

    const [dateGarde, setDateGarde] = useState('');
    const [delaisRecu, setDelaisRecu] = useState('');
    const [limiteRecu, setLimiteRecu] = useState('');
    const [dateReponse, setDateReponse] = useState('');

    const handleDateGarde = (e) => {
        const val = e.target.value;
        setDateGarde(val);
        if (val && delaisRecu) {
            const d = new Date(val);
            d.setDate(d.getDate() + parseInt(delaisRecu));
            setLimiteRecu(d.toISOString().split('T')[0]);
        }
    };
    const priority = delaisRecu
        ? parseInt(delaisRecu) <= 7 ? 'urgent' : 'normal'
        : 'normal';

    const handleDelais = (e) => {
        const val = e.target.value;
        setDelaisRecu(val);
        if (dateGarde && val) {
            const d = new Date(dateGarde);
            d.setDate(d.getDate() + Number.parseInt(val));
            setLimiteRecu(d.toISOString().split('T')[0]);
        }
    };

    // date_reponse - limite_recu
    const dateDiff = limiteRecu && dateReponse
        ? Math.round((new Date(dateReponse) - new Date(limiteRecu)) / (1000 * 60 * 60 * 24))
        : "";
    const [loading, setLoading] = useState(false);

    //Message Submition
    const [toast, setToast] = useState({ show: false, success: true });

    const showToast = (success) => {
        setToast({ show: true, success });
        setTimeout(() => setToast({ show: false, success: true }), 5000);
    };

    // Ajout Handler
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/courriers`, {
                n_garde: document.getElementById('n_garde').value,
                date_garde: dateGarde,
                sujet: document.getElementById('sujet').value,
                date_recu: document.getElementById('date_recu').value,
                limite_recu: limiteRecu,
                delais_recu: delaisRecu,
                reponse: document.getElementById('reponse').value,
                n_reponse: document.getElementById('n_reponse').value,
                date_reponse: dateReponse,
                priority: priority,
                status: 'pending',
            });
            dispatch(addCourrier(res.data));
            showToast(true);
        } catch (error) {
            console.error(error);
            showToast(false);
        } finally {
            setLoading(false);
        }
    }
    //Print Handler Fuction
    const handlePrint = async () => {
        try {
            const response = await fetch('/template.docx');
            const arrayBuffer = await response.arrayBuffer();
            const zip = new PizZip(arrayBuffer);
            const doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
                delimiters: {
                    start: '{',
                    end: '}'
                }
            });

            doc.render({
                n_garde: `\u200E${document.getElementById('n_garde').value || ''}`,
                date_garde: `\u200E${dateGarde || ''}`,
                sujet: document.getElementById('sujet').value || '',
                reponse: document.getElementById('reponse').value || '',
                n_reponse: `\u200E${document.getElementById('n_reponse').value || ''}`,
            });
            // \u200E is an invisible Left-to-Right Mark character — it forces Word to display the text in LTR direction.

            const output = doc.getZip().generate({ type: 'blob' });
            saveAs(output, `مراسلة.docx`);
        } catch (err) {
            console.error(err);
            alert('حدث خطأ أثناء الطباعة ❌');
        }
    };
    return (
        <div className='container w-100 mx-auto' dir='rtl'>
            <form action="" onSubmit={handleSubmit} >
                <fieldset>
                    <legend>اضافة مراسلة جديدة</legend>

                    <div className="row">
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label htmlFor="n_garde" className="form-label">رقم المراسلة</label>
                                <input type="text" className="form-control text-start" id="n_garde" name='n_garde' placeholder="1234/A/1234/1234" pattern="\d{1,4}/[A-Z]/\d{1,4}/\d{1,4}" dir='ltr' required />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label htmlFor="date_garde" className="form-label">تاريخها</label>
                                <input type="date" className="form-control" id="date_garde" name='date_garde' value={dateGarde} onChange={handleDateGarde} required />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label htmlFor="delais_recu" className="form-label">أجل التسليم (بالأيام)</label>
                                <input type="number" className="form-control text-start" id="delais_recu" name='delais_recu' value={delaisRecu} onChange={handleDelais} min="1" dir='ltr' />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label htmlFor="limite_recu" className="form-label">تاريخ التسليم المحتمل</label>
                                <input type="date" className="form-control" id="limite_recu" name='limite_recu' value={limiteRecu} onChange={(e) => setLimiteRecu(e.target.value)} readOnly />
                            </div>
                        </div>
                    </div>

                    {/* Row 2 — sujet */}
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="sujet" className="form-label">موضوع المراسلة</label>
                            <textarea name="sujet" id="sujet" className="form-control" required></textarea>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="date_recu" className="form-label">تاريخ الاستلام</label>
                                <input type="date" className="form-control" id="date_recu" name='date_recu' required />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="reponse" className='form-label'>نص الموضوع</label>
                            <textarea name="reponse" id="reponse" rows="3" className='form-control'></textarea>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label htmlFor="n_reponse" className="form-label">رقم الجواب</label>
                                <input type="text" name="n_reponse" id="n_reponse" className="form-control text-start" placeholder="1234/A/1234/1234" pattern="\d{1,4}/[A-Z]/\d{1,4}/\d{1,4}" dir="ltr" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label htmlFor="date_reponse" className="form-label">تاريخ الجواب</label>
                                <input type="date" name="date_reponse" id="date_reponse" className="form-control" value={dateReponse} onChange={(e) => setDateReponse(e.target.value)} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label htmlFor="dateDiff" className='form-label'>النجاعة</label>
                                <input type="text" name="dateDiff" id="dateDiff" readOnly className={`form-control text-start ${dateDiff === "" ? "" : dateDiff <= 0 ? "text-success" : "text-danger"}`} value={dateDiff === '' ? '' : `${dateDiff <= 0 ? "+" : "-"}${Math.abs(dateDiff)} أيام`} placeholder="يحسب تلقائيا" />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading ? (
                            <>
                                <span className="spinner-grow spinner-grow-sm me-2 mx-2" role="status" aria-hidden="true"></span>
                                جاري الحفظ...
                            </>
                        ) : 'حفظ'}
                    </button>
                    <button type="button" className="btn btn-info mx-2" onClick={handlePrint}>طباعة</button>
                </fieldset>
            </form>
            {toast.show && (
                <div style={{
                    position: 'fixed',
                    bottom: '1.5rem',
                    right: '1.5rem',
                    zIndex: 9999,
                    minWidth: '280px',
                    animation: 'fadeIn 0.3s ease'
                }}>
                    <div className={`alert ${toast.success ? 'alert-success' : 'alert-danger'} shadow-lg d-flex align-items-center gap-2 mb-0`}>
                        <span style={{ fontSize: '1.3rem' }}>{toast.success ? '✅' : '❌'}</span>
                        <span>{toast.success ? 'تم الحفظ بنجاح' : 'حدث خطأ أثناء الحفظ'}</span>
                    </div>
                </div>
            )}
        </div>
    )
}
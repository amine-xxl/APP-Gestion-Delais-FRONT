import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCourrier } from '../store/courrierSlice';
import axios from 'axios';

export default function Edit() {
    useEffect(() => { document.title = "SETAS | تعديل"; }, []);

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        n_garde: '', date_garde: '', sujet: '', date_recu: '',
        limite_recu: '', delais_recu: '', reponse: '',
        n_reponse: '', date_reponse: '', status: 'pending'
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/courriers/${id}`)
            .then(res => {
                const d = res.data;
                setForm({
                    n_garde: d.n_garde || '',
                    date_garde: d.date_garde || '',
                    sujet: d.sujet || '',
                    date_recu: d.date_recu || '',
                    limite_recu: d.limite_recu || '',
                    delais_recu: d.delais_recu || '',
                    reponse: d.reponse || '',
                    n_reponse: d.n_reponse || '',
                    date_reponse: d.date_reponse || '',
                    status: d.status || 'pending'
                });
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/courriers/${id}`, form);
            dispatch(updateCourrier(res.data));
            navigate('/Exits');
        } catch (err) {
            console.error(err);
            alert('حدث خطأ أثناء التعديل ❌');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="text-center mt-5">
            <span className="spinner-grow text-success" role="status"></span>
        </div>
    );

    return (
        <div className='edit-page container w-100 mx-auto' dir='rtl'>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>تعديل المراسلة</legend>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label className="form-label">رقم المراسلة</label>
                                <input type="text" name="n_garde" className="form-control text-start"
                                    value={form.n_garde} onChange={handle} dir='ltr' required />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label className="form-label">تاريخها</label>
                                <input type="date" name="date_garde" className="form-control"
                                    value={form.date_garde} onChange={handle} required />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label className="form-label">أجل التسليم (بالأيام)</label>
                                <input type="number" name="delais_recu" className="form-control text-start"
                                    value={form.delais_recu} onChange={handle} min="1" dir='ltr' />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label className="form-label">تاريخ التسليم المحتمل</label>
                                <input type="date" name="limite_recu" className="form-control"
                                    value={form.limite_recu} onChange={handle} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label className="form-label">موضوع المراسلة</label>
                            <textarea name="sujet" className="form-control"
                                value={form.sujet} onChange={handle} required></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">تاريخ الاستلام</label>
                                <input type="date" name="date_recu" className="form-control"
                                    value={form.date_recu} onChange={handle} required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">الحالة</label>
                                <select name="status" className="form-control" value={form.status} onChange={handle}>
                                    <option value="pending">قيد الانتظار</option>
                                    <option value="answered">تمت الإجابة</option>
                                    <option value="archived">مؤرشف</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label className="form-label">نص الجواب</label>
                            <textarea name="reponse" className="form-control" rows="3"
                                value={form.reponse} onChange={handle}></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">رقم الجواب</label>
                                <input type="text" name="n_reponse" className="form-control text-start"
                                    value={form.n_reponse} onChange={handle} dir='ltr' />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">تاريخ الجواب</label>
                                <input type="date" name="date_reponse" className="form-control"
                                    value={form.date_reponse} onChange={handle} />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-success" disabled={saving}>
                            {saving ? <><span className="spinner-grow spinner-grow-sm mx-2"></span> جاري الحفظ... </> : 'حفظ التعديلات'}
                        </button>
                        <button type="button" className="btn btn-danger" onClick={() => navigate('/Exits')}>
                            إلغاء
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}
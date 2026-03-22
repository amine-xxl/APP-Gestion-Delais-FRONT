import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCourriers, deleteCourrier, setLoading } from '../store/courrierSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PencilSquare, Trash3Fill } from 'react-bootstrap-icons';

export default function Exits() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courriers, loading } = useSelector(state => state.courriers);
  useEffect(() => {
    document.title = "SETAS | الـمـخـرجـات";
    dispatch(setLoading(true));
    axios.get(`${process.env.REACT_APP_API_URL}/api/courriers`)
      .then(res => {
        dispatch(setCourriers(res.data));
        dispatch(setLoading(false));
      })
      .catch(err => {
        console.error(err);
        dispatch(setLoading(false));
      });
      // eslint-disable-next-line
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه المراسلة؟')) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/courriers/${id}`);
      dispatch(deleteCourrier(id));
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء الحذف ❌');
    }
  };

  return (
    <div className='container w-100 mx-auto mt-3' dir='rtl'>
      <h4 className='mb-3'>قائمة المراسلات</h4>
      {loading ? (
        <div className="text-center m-5">
          <span className="spinner-grow text-success" role="status"></span>
        </div>
      ) : (
        <table className='table table-bordered table-striped table-hover text-center'>
          <thead className='table-success'>
            <tr>
              <th>#</th>
              <th>رقم المراسلة</th>
              <th>تاريخها</th>
              <th>الموضوع</th>
              <th>تاريخ الاستلام</th>
              <th>أجل التسليم</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {courriers.map((c, i) => (
              <tr key={c.id}>
                <td>{i + 1}</td>
                <td className='text-start' dir='ltr'>{c.n_garde}</td>
                <td>{c.date_garde}</td>
                <td className='text-start'>{c.sujet}</td>
                <td>{c.date_recu}</td>
                <td>{c.delais_recu} يوم</td>
                <td>
                  <button className='btn btn-sm btn-primary mx-1' onClick={() => navigate(`/edit/${c.id}`)}><PencilSquare /> </button>
                  <button className='btn btn-sm btn-danger' onClick={() => handleDelete(c.id)}><Trash3Fill /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
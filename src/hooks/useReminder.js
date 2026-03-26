import { useEffect } from 'react';
import axios from 'axios';

const STORAGE_KEY = 'setas_reminder_date';

export default function useReminders() {
    useEffect(() => {
        const check = async () => {
            const today = new Date().toDateString();
            const lastShown = localStorage.getItem(STORAGE_KEY);
            if (lastShown === today) return;

            try {
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/courriers/reminders`);
                const courriers = res.data;
                if (!courriers.length) return;

                if ('Notification' in window) {
                    const permission = await Notification.requestPermission();
                    if (permission === 'granted') {
                        courriers.forEach(c => {
                            new Notification('⚠️ تنبيه SETAS', {
                                body: `المراسلة ${c.n_garde} — أجلها بعد 5 أيام`,
                                icon: '/royal.png'
                            });
                        });
                    }
                }

                localStorage.setItem(STORAGE_KEY, today);
            } catch (err) {
                console.error(err);
            }
        };

        check();
    }, []);
}
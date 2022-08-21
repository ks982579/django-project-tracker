import React, {useState} from "react";

import Card from "../../ui/Card";
import CookieMonster from "../../CookieMonster";

// Helpers
import JustActions from "../../../actions/just-actions";

// Import Sassy CSS
import sassy from './PasswordResetForm.module.scss';

const PasswordResetForm = () => {
    const [sending, setSending] = useState(false);
    const [sentEmail, setSentEmail] = useState(false);
    const [msg2user, setMsg2user] = useState('');

    const passwordResetHandler = async (event) => {
        event.preventDefault();
        sentEmail(false);
        setSending(true);
        const apiResponse = await JustActions.passwordResetEmail(event.target);
        if(apiResponse.response == 'ok'){
            setSending(false);
            setSentEmail(true);
            setMsg2user('Email sent, check your inbox.');
        } else {
            setSending(false);
            setSentEmail(true);
            setMsg2user(apiResponse.response);
        }

    }
    return (
        <div className={sassy['pw-reset-container']}>
            <p>
                Did you forget your password? That's no trouble at all.
                Just provide the email address you've linked to your account
                and we can send instructions to reset your password
                so you can get your projects back on track.
            </p>
            <Card className={sassy['pw-reset-card']}>
                <form onSubmit={passwordResetHandler}>
                    <CookieMonster />
                    <input type="email" name="email" placeholder="Email..." required />
                    <input type="submit" value="send" />
                </form>
                {sending && <p>Sending email...</p>}
                {sentEmail && <p>{msg2user}</p>}
            </Card>
        </div>
    );
};

export default PasswordResetForm;
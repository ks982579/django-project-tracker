import React from "react";

import Card from "../../ui/Card";

// Import Sassy CSS
import sassy from './PasswordResetForm.module.scss';

const PasswordResetForm = () => {
    const passwordResetHandler = (event) => {
        event.preventDefault();
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
                    <input type="email" name="email" placeholder="Email..." required />
                    <input type="submit" value="send" />
                </form>
            </Card>
        </div>
    );
};

export default PasswordResetForm;
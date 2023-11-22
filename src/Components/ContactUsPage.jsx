import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './ContactUsPage.css'; // Create a CSS file for additional styling
import Lottie from 'lottie-react';
import ani from '../Assets/Animation/contactUs.json'; // Import your Lottie animation JSON

const ContactUsPage = () => {
    return (
        <div className="container contact-us-container" id='contact'>
            <div className="row">
                <div className="col-md-6">
                    {/* Animation on the left side */}
                    <Lottie animationData={ani} />
                </div>
                <div className="col-md-6">
                    {/* Contact form or content on the right side */}
                    <h2>Contact Us</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea className="form-control" id="message" rows="4"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactUsPage;

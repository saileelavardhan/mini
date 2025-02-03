from flask import Flask, render_template, request, redirect, url_for
import os
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Get the absolute path to the template directory
template_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'templates'))
app = Flask(__name__, template_folder=template_dir)
app.config['SECRET_KEY'] = 'your-secret-key-here'  # Change this to a secure secret key

@app.route('/')
def home():
    try:
        return render_template('index.html')
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return str(e), 500

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    try:
        if request.method == 'POST':
            name = request.form.get('name')
            email = request.form.get('email')
            message = request.form.get('message')
            
            # Validate form data
            if not all([name, email, message]):
                logger.warning("Incomplete form submission")
                return render_template('contact.html', error="All fields are required")
            
            logger.info(f"Contact form submission from {email}")
            # Here you can add code to handle the form submission
            # For example, sending an email or saving to a database
            return redirect(url_for('thank_you'))
        return render_template('contact.html')
    except Exception as e:
        logger.error(f"Error in contact form: {str(e)}")
        return render_template('500.html'), 500

@app.route('/thank-you')
def thank_you():
    return render_template('thank_you.html')

# Error handlers
@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500

if __name__ == '__main__':
    app.run(debug=True)

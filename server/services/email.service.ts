import sgMail from "@sendgrid/mail";
const host = process.env.HOST;
require('dotenv').config()
const sendingEmail = process.env.SENDING_EMAIL;

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);


export const createResetPasswordEmail = (
  receiverEmail: string,
  resetTokenValue: string
): sgMail.MailDataRequired => {
  const email: sgMail.MailDataRequired = {
    to: receiverEmail,
    from: `${sendingEmail}`,
    subject: "Reset password link",
    text: "Some useless text",
    html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n Please click on the following link, or paste this into your browser to complete the process:\n\n
  <a href="http://${host}/login/reset/${resetTokenValue}">http://${host}/login/reset/${resetTokenValue}</a> \n\n If you did not request this, please ignore this email and your password will remain unchanged.\n </p>`,
  };

  return email;
};

export const createResetConfirmationEmail = (receiverEmail: string): sgMail.MailDataRequired => {
  const email: sgMail.MailDataRequired = {
    to: receiverEmail,
    from: `${sendingEmail}`,
    subject: "Your password has been changed",
    text: "Some useless text",
    html: `<p>This is a confirmation that the password for your account ${receiverEmail} has just been changed. </p>`,
  };

  return email;
};

export const createVerificationEmail = (
  receiverEmail: string,
  OTP: string
): sgMail.MailDataRequired => {
  const email = {
    to: receiverEmail,
    from: `${sendingEmail}`,
    subject: "Email Verification",
    text: "This is a verification Email from Pivitle.",
    html: `<p>Your OTP for verification is ${OTP}. Valid for 10 minutes.</p>`,
  };

  return email;
};

export const addUserEmail = (
  receiverEmail: string,
  url: string
): sgMail.MailDataRequired => {
  const email = {
    to: receiverEmail,
    from: `${sendingEmail}`,
    subject: "Email Verification",
    text: "This is a verification Email from Pivitle.",
    html: addUserHTML(url)
  };

  return email;
};

export const createContactUsEmail = (
  form: {
    discussAbout: string,
    companyEmail: string,
    firstName: string,
    lastName: string,
    companyName: string,
    jobTitle: string,
    service: string,
    people: number,
    question: string
  }
): sgMail.MailDataRequired => {
  
  const text = `${form.firstName} ${form.lastName} of company ${form.companyName} with job title ${form.jobTitle} has requeted info on topic ${form.discussAbout} & about service ${form.service}.`;
  const html = `<p>
    <b>${form.jobTitle} ${form.firstName} ${form.lastName}</b> of company <b>${form.companyName}</b> has requested information about topic <b>${form.discussAbout}</b> & about service <b>${form.service}</b>.<br><br>
    Company Name: <b>${form.companyName}</b><br>
    Company Email: <b>${form.companyEmail}</b><br>
    Number of People: <b>${form.people}</b><br>
    First Name: <b>${form.firstName}</b><br>
    Last Name: <b>${form.lastName}</b><br>
    Job Title: <b>${form.jobTitle}</b><br>
    Topic : <b>${form.discussAbout}</b><br>
    Service : <b>${form.service}</b><br>
    Question : <b>${form.question}</b>
  </p>`

  const email = {
    to: 'mail@pivitle.com',
    from: `${sendingEmail}`,
    subject: "Contact Us",
    text,
    html
  };

  return email;
};

export const sendEmail = async (email: sgMail.MailDataRequired) => sgMail.send(email);

export default {
  createResetPasswordEmail,
  createResetConfirmationEmail,
  createVerificationEmail,
  createContactUsEmail,
  sendEmail,
  addUserEmail
};


const addUserHTML = (url: string) => `<p>
Please click on the <b>Update Password</b> button below to move forward with sign-up steps. 
<br>
<br> 
<a href="${url}">
  <button>
    Update Password
  </button>
</a>
<p>`
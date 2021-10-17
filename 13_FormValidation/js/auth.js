import { signinInput, signinSubmit } from './signin.js';
import { signupInput, signupSubmit } from './signup.js';

// // DOM Nodes
const $signinForm = document.querySelector('.signin');
const $signupForm = document.querySelector('.signup');
const [$signUplink, $signInlink] = document.querySelectorAll('.link > a');

// Set link
[$signUplink, $signInlink].forEach($link => {
  $link.onclick = () =>
    [$signinForm, $signupForm].forEach($form => $form.classList.toggle('hidden'));
});

[$signinForm.oninput, $signinForm.onsubmit] = [_.throttle(signinInput, 100), signinSubmit];
[$signupForm.oninput, $signupForm.onsubmit] = [_.throttle(signupInput, 100), signupSubmit];

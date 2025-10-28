export default function Contact() {
  return (
    <div>
      <h1>Contact Me</h1>
      <form>
        <input type="text" placeholder="First Name" /><br />
        <input type="text" placeholder="Last Name" /><br />
        <input type="email" placeholder="Email" /><br />
        <textarea placeholder="Message"></textarea><br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

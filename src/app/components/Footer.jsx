export default function Footer() {
  return (
    <footer className=" text-white py-8 bg-dark-foreground">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row justify-between items-center">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-2xl font-bold">Whats Plots</h3>
          <p>A way to plan and attend events</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
          <p>Email: contact@whatsplots.com</p>
        </div>
      </div>
    </footer>
  );
}

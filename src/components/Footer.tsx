
const Footer = () => {
  return (
    <footer className="py-6 mt-12 border-t border-border">
      <div className="container text-center">
        <p className="text-muted-foreground">
          &copy; {new Date().getFullYear()} MangaNook. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

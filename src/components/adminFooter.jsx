// app/components/Footer.tsx
export default function AdminFooter() {
  return (
    <footer className="bg-secondary px-4 sm:px-6 lg:px-8">     
      {/* Copyright */}
      <div className="py-8 border-t border-primary text-center text-white">
        <p>
          © {new Date().getFullYear()} Saydaliyya. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
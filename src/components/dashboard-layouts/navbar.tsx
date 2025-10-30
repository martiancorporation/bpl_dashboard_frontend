import logo from "@/assets/logo.png";

export default function Navbar({ title }: { title: string }) {
  return (
    <div className="w-full h-[55px] bg-white border border-b border-[#EEEEEE] flex items-center justify-between px-8">
      <p className="text-[#3C3C3C] text-base font-semibold">{title}</p>
      <div className="border rounded-full">
        <img src={logo} alt="Profile" className="w-9 h-9 rounded-full" />
      </div>
    </div>
  );
}

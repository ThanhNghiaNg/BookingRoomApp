interface CreateRoomProps {
  children?: React.ReactNode;
}

export default function CreateRoomLayout({ children }: CreateRoomProps) {
  return (
    <div className="container mx-auto grid items-start gap-10 py-8">
      {children}
    </div>
  );
}

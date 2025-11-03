export const GridBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-20" style={{ zIndex: 0 }}>
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(195 100% 50% / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(195 100% 50% / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, hsl(220 25% 6%) 100%)',
        }}
      />
    </div>
  );
};

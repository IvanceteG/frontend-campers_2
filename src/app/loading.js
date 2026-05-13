export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div
          aria-hidden="true"
          className="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin"
        />
        <p className="text-sm text-muted">Carregant...</p>
      </div>
    </div>
  );
}

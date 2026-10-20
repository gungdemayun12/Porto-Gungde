/**
 * NotFound — halaman 404 bertema emas
 */
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useLang } from '../hooks/useLang';
import Button from '../components/ui/Button';

export default function NotFound() {
  const navigate = useNavigate();
  const { t } = useLang();

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Glow background */}
      <div className="hero-glow" />

      <div className="container-main text-center relative z-10">
        {/* Angka 404 besar dengan gradien emas */}
        <h1 className="text-[8rem] sm:text-[12rem] lg:text-[16rem] font-heading font-bold leading-none
          gradient-gold-text select-none">
          {t.notFound.title}
        </h1>

        <h2 className="text-fluid-h2 font-bold text-text mb-4 -mt-4 lg:-mt-8">
          {t.notFound.subtitle}
        </h2>

        <p className="text-muted text-fluid-body max-w-md mx-auto mb-8">
          {t.notFound.description}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={() => navigate('/')}>
            <Home size={18} />
            {t.notFound.backHome}
          </Button>

          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            Go Back
          </Button>
        </div>
      </div>
    </main>
  );
}

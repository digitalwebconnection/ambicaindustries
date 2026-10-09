import { ReactLenis } from 'lenis/react';
import Layout from '@/components/layout/Layout';
import AppRoutes from '@/routes';

// Lenis smooth scrolling options calibrated for premium fluid momentum
const lenisOptions = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
  infinite: false,
  orientation: 'vertical' as const,
  gestureOrientation: 'vertical' as const,
};

export default function App() {
  return (
    <ReactLenis root options={lenisOptions}>
      <Layout>
        <AppRoutes />
      </Layout>
    </ReactLenis>
  );
}

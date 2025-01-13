// pages/about.tsx
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-6 py-12 space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">À propos de notre Blog</h1>
        <p className="text-lg text-gray-600">Découvrez qui nous sommes et pourquoi ce blog existe.</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Notre mission</h2>
        <p className="text-gray-600">
          Ce blog a été créé pour partager des connaissances sur la technologie, le développement web, et bien plus
          encore. Notre objectif est d&apos;inspirer, éduquer, et connecter des passionnés du monde entier grâce à des
          articles bien documentés et engageants.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Ce que nous proposons</h2>
        <ul className="list-disc pl-8 text-gray-600">
          <li>Des articles approfondis sur des sujets techniques.</li>
          <li>Un système de commentaires pour échanger avec d&apos;autres utilisateurs.</li>
          <li>Des fonctionnalités comme les likes et les recherches par tags.</li>
          <li>Une interface utilisateur moderne et intuitive.</li>
        </ul>
      </section>

      {/* Équipe */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Rencontrez notre équipe</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Membre d'équipe 1 */}
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image src="/moi.jpeg" alt="Photo de Jane Doe" layout="fill" objectFit="cover" className="rounded-full" />
            </div>
            <h3 className="font-bold text-lg">Jane Doe</h3>
            <p className="text-gray-600">Développeuse Backend</p>
          </div>
          {/* Membre d'équipe 2 */}
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image
                src="/front.webp"
                alt="Photo de John Smith"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <h3 className="font-bold text-lg">Audre Sylla</h3>
            <p className="text-gray-600">Designer Frontend</p>
          </div>
          {/* Membre d'équipe 3 */}
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image
                src="/res.webp"
                alt="Photo de Sarah Johnson"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <h3 className="font-bold text-lg">Sarah Johnson</h3>
            <p className="text-gray-600">Responsable Produit</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

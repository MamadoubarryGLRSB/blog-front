import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className="container mx-auto px-6 py-12 space-y-12 text-center">
      <section>
        <h1 className="text-4xl font-bold mb-4">Nous Contacter</h1>
        <p className="text-lg text-gray-600">
          Vous avez des questions ou souhaitez collaborer ? Voici comment nous joindre.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Informations de contact</h2>
        <div className="space-y-4 text-gray-600">
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt size={24} className="text-blue-500 mb-1" />
            <span>123 Rue Exemple, Ville, Pays</span>
          </div>
          <div className="flex flex-col items-center">
            <FaPhoneAlt size={24} className="text-blue-500 mb-1" />
            <span>+33 1 23 45 67 89</span>
          </div>
          <div className="flex flex-col items-center">
            <FaEnvelope size={24} className="text-blue-500 mb-1" />
            <span>contact@exemple.com</span>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Suivez-nous</h2>
        <div className="flex justify-center space-x-6 text-gray-600">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <FaFacebook size={28} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <FaTwitter size={28} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <FaLinkedin size={28} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

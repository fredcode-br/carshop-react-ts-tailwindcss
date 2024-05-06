import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid';

function Contact() {
  return (
    <div className="container mx-auto pt-8 pb-14 px-4 md:px-8 lg:px-16 xl:px-32">
      <h2 className="text-center font-bold font-poppins text-4xl pb-4">Contato</h2>
      <div className="flex flex-col md:flex-row bg-white rounded-lg p-2 gap-3">
        <div className="flex flex-col w-full md:w-2/5 p-4 bg-black text-white rounded-lg">
          <h2 className="text-center text-2xl font-bold mb-6">Informações de Contato</h2>
          <div className='flex justify-start items-center gap-2 mt-6'>
            <PhoneIcon height={20}/>
            <p>(11) 9 9999-9999</p>
          </div>
          <div className='flex justify-start items-center gap-2 mt-6'>
            <PhoneIcon height={20}/>
            <p>(11) 9 9999-9999</p>
          </div>
          <div className='flex justify-start items-center gap-2 mt-6'>
            <EnvelopeIcon height={20}/>
            <p>example@gmail.com</p>
          </div>
        </div>
        <div className="w-full md:w-3/5 rounded-lg" style={{ height: '400px' }}>
          <form className="p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-1">
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                <input type="text" id="nome" name="nome" className="mt-1 p-2 border rounded-md w-full" />
              </div>
              <div className="col-span-1">
                <label htmlFor="sobrenome" className="block text-sm font-medium text-gray-700">Sobrenome</label>
                <input type="text" id="sobrenome" name="sobrenome" className="mt-1 p-2 border rounded-md w-full" />
              </div>
              <div className="col-span-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                <input type="email" id="email" name="email" className="mt-1 p-2 border rounded-md w-full" />
              </div>
              <div className="col-span-1">
                <label htmlFor="contato" className="block text-sm font-medium text-gray-700">Contato</label>
                <input type="text" id="contato" name="contato" className="mt-1 p-2 border rounded-md w-full" />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700">Mensagem</label>
              <textarea id="mensagem" name="mensagem" rows={4} className="mt-1 p-2 border rounded-md w-full"></textarea>
            </div>
            <button type="submit" className="mt-4 bg-black text-white p-2 rounded-md">Enviar Mensagem</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;

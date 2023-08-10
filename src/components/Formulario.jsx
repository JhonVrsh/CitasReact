import {useState, useEffect} from 'react'
import Error from './Error'

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
  const [nombre, setNombre] = useState("")
  const [propietario, setPropietario] = useState("")
  const [email, setEmail] = useState("")
  const [fecha, setFecha] = useState("")
  const [sintomas, setSintomas] = useState("")

  const[error, setError]= useState(false)

  useEffect(() => {
     if(Object.keys(paciente).length > 0) {
       
       setNombre(paciente.nombre)
       setPropietario(paciente.propietario)
       setEmail(paciente.email)
       setFecha(paciente.fecha)
       setSintomas(paciente.sintomas)
     }

  }, [paciente])

  const generarId = () =>{
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36)

    return random + fecha
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //validacion del formulario
    if([nombre, propietario, email, fecha, sintomas].includes("")){
      console.log("Hay almenos un campo vacio");
      setError (true)
      return; 
    }
      
    setError (false)
    // objeto de pacientes
    const objetoPacientes={
      nombre,
      propietario,
      email, 
      fecha, 
      sintomas,
      id: generarId()

    }

    if(paciente.id){
      //Editando registro
      objetoPacientes.id = paciente.id;
      console.log(objetoPacientes)
      console.log(paciente)
      
      const pacientesAcutalizados =pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPacientes : pacienteState)

      setPacientes(pacientesAcutalizados)
      setPaciente({})

    }else{
      //Nuevo registro
      objetoPacientes.id = generarId();
      setPacientes ([...pacientes, objetoPacientes])
    }
    

    //reiniciar el formulario

    setNombre ("")
    setEmail("")
    setFecha ("")
    setPropietario("")
    setSintomas("")
    
    console.log("enviando formulario")
  }


  
  return (
    <div className='md:w-1/2 lg:w-3/5'>
      <h2 className='font-black text-3xl text-center'>Formulario</h2>
      <p className='text-xl mt-5  text-center mb-10'>
        Añade Pacientes y {""}
        <span className='text-indigo-600 font-bold'> Administralos</span>
      </p>

      <form 
        onSubmit={handleSubmit}
        className='bg-white shadow-md rounded-lg py-10 px-5'>

        {error && <Error>Todos los campos son obligatorios</Error>}  

        <div className='mb-5'>
          <label htmlfor="mascota" className='block text-gray-700 uppercase font-bold'>Nombre Mascota</label>
          <input
           id='mascota'
           type="text"
           placeholder='Nombre mascota'
           className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
           value={nombre}
           onChange={ (e) => setNombre(e.target.value)}
           />
        </div>

        <div className='mb-5'>
          <label htmlfor="propietario" className='block text-gray-700 uppercase font-bold'>Propietario</label>
          <input
           id='propietario' 
           type="text"
           placeholder='Propietario'
           className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
           value={propietario}
           onChange={ (e) => setPropietario(e.target.value)} />

        </div>

        <div className='mb-5'>
          <label htmlfor="email" className='block text-gray-700 uppercase font-bold'>email</label>
          <input
           id='mascota'
           type="email"
           placeholder='email contacto'
           className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
           value={email}
           onChange={ (e) => setEmail(e.target.value)} />
        </div>

        <div className='mb-5'>
          <label htmlfor="alta" className='block text-gray-700 uppercase font-bold'>Alta</label>
          <input
           id='alta'
           type="date"
           className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
           value={fecha}
           onChange={ (e) => setFecha(e.target.value)} />
        </div>

        <div className='mb-5'>
          <label htmlfor="sintomas" className='block text-gray-700 uppercase font-bold'>Síntomas</label>
          <textarea
           id='sintomas'
           type="date"
           className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
           placeholder='Describe los Síntomas'
           value={sintomas}
           onChange={ (e) => setSintomas(e.target.value)} />
        </div>

        <input
         type="submit"
         className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors'
         value={paciente.id ? "editar paciente": "Agregar paciente"} />
      
      </form>
    </div>
  )
}

export default Formulario

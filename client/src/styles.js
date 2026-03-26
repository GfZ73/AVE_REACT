const styles = {
  container: {
    display: 'flex',
    width: '100vw',
    minHeight: '100vh',
    margin: 0,
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#000',
    color: '#fff',
    gap: '40px',
    boxSizing: 'border-box',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: 'auto',
  },
   lewyPanel: {
      flex: '0 0 400px',
      backgroundColor: '#111',
      borderRadius: '20px',
      padding: '30px',
      border: '1px solid #333',
      height: 'fit-content',
      position: 'sticky',
      top: '20px',
    },
    
    przyciskDodawaniaZdjecia: {
      width: '100%',
      padding: '40px 25px',
      backgroundColor: '#1a1a1a',
      border: '3px dashed #444',
      borderRadius: '15px',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
      transition: 'all 0.3s ease',
      marginBottom: '25px',
      color: '#fff',
      boxSizing: 'border-box',
    },
    
    ikonaPlus: { 
      fontSize: '60px', 
      color: '#666', 
      fontWeight: 'bold' 
    },
    
    tekstPrzycisku: { 
      color: '#ccc', 
      fontSize: '18px', 
      fontWeight: '600', 
      textAlign: 'center',
      lineHeight: '1.6',
    },
    
    podgladZdjecia: { 
      width: '100%', 
      borderRadius: '12px', 
      overflow: 'hidden', 
      position: 'relative', 
      marginBottom: '25px',
    },
    
    zdjecie: { 
      width: '100%', 
      height: 'auto', 
      display: 'block', 
      borderRadius: '10px', 
      border: '1px solid #333' 
    },
    
    przyciskUsunZdjecie: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      backgroundColor: 'rgba(255,59,48,0.9)',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
      transition: 'background-color 0.3s',
    },
    
    // NOWE STYLE - dla przycisków AI (dodane bez zmiany istniejących)
    przyciskAnalizy: {
      width: '100%',
      padding: '15px',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '18px',
      fontWeight: '600',
      cursor: 'pointer',
      marginBottom: '15px',
      transition: 'background-color 0.3s',
    },
    
    przyciskZatwierdz: {
      width: '100%',
      padding: '15px',
      backgroundColor: '#27ae60',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '18px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '15px',
      transition: 'background-color 0.3s',
    },
    
    wynikiAnalizy: {
      backgroundColor: '#1a1a1a',
      borderRadius: '10px',
      padding: '20px',
      marginTop: '15px',
      border: '1px solid #444',
    },
    
    wynikItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 0',
      borderBottom: '1px solid #333',
      fontSize: '16px',
    },
    
    loader: {
      textAlign: 'center',
      padding: '20px',
      color: '#ccc',
      fontSize: '16px',
    },
    
    informacjaZdjecie: {
      marginTop: '20px',
      padding: '25px',
      backgroundColor: '#1a1a1a',
      borderRadius: '12px',
      fontSize: '16px',
      color: '#aaa',
      textAlign: 'center',
      border: '1px solid #333',
      lineHeight: '1.8',
    },
    
    prawyPanel: { 
      flex: 1, 
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
    },
    
    kategorieBar: { 
      display: 'flex', 
      justifyContent: 'center', 
      gap: '12px', 
      marginBottom: '30px', 
      flexWrap: 'wrap',
      width: '100%',
    },
    
    kategorieButton: {
      padding: '15px 30px',
      border: '2px solid #fff',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      borderRadius: '12px',
      fontSize: '18px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      color: '#fff',
      whiteSpace: 'nowrap',
    },
    
    aktywnaKategoria: { 
      backgroundColor: '#fff', 
      color: '#000' 
    },
    
    dodajWydatekButton: {
      backgroundColor: '#27ae60',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '18px 36px',
      fontSize: '20px',
      fontWeight: '600',
      cursor: 'pointer',
      marginBottom: '30px',
      transition: 'background-color 0.3s',
      alignSelf: 'flex-end',
    },
    
    srodkowyContainer: { 
      textAlign: 'center',
      width: '100%',
    },
    
    sumaWydatkow: { 
      margin: '30px 0 30px 0',
      padding: '40px',
      backgroundColor: '#111', 
      borderRadius: '20px',
      border: '1px solid #333',
      width: '100%',
      boxSizing: 'border-box',
    },
    
    sumaTytul: { 
      fontSize: '36px', 
      marginBottom: '15px', 
      fontWeight: '600', 
      textTransform: 'uppercase', 
      letterSpacing: '2px', 
      color: '#fff' 
    },
    
    sumaKwota: { 
      fontSize: '72px', 
      fontWeight: 'bold', 
      color: '#fff', 
      display: 'inline-block', 
      padding: '20px 60px',
      borderRadius: '20px', 
      border: '3px solid #fff',
    },
    
    listaWydatkow: { 
      marginTop: '20px', 
      backgroundColor: '#111', 
      borderRadius: '20px', 
      padding: '30px',
      border: '1px solid #333',
      width: '100%',
      boxSizing: 'border-box',
    },
    
    listaTytul: { 
      fontSize: '28px', 
      marginBottom: '20px', 
      borderBottom: '3px solid #fff',
      paddingBottom: '15px', 
      fontWeight: '600', 
      color: '#fff' 
    },
    
    tabela: { 
      width: '100%', 
      borderCollapse: 'collapse', 
      marginTop: '15px', 
      tableLayout: 'fixed' 
    },
    
    naglowekTabeli: { 
      backgroundColor: '#222', 
      color: '#fff', 
      padding: '18px',
      textAlign: 'left', 
      fontSize: '18px', 
      fontWeight: '600', 
      borderBottom: '2px solid #444' 
    },
    
    wierszTabeli: { 
      borderBottom: '2px solid #333', 
      transition: 'background-color 0.2s', 
      cursor: 'pointer' 
    },
    
    komorkaTabeli: { 
      padding: '18px',
      color: '#fff', 
      fontSize: '18px',
      overflow: 'hidden', 
      textOverflow: 'ellipsis', 
      whiteSpace: 'nowrap' 
    },
    
    komorkaKwota: { 
      padding: '18px',
      color: '#fff', 
      fontWeight: '600', 
      fontSize: '18px',
      overflow: 'hidden', 
      textOverflow: 'ellipsis', 
      whiteSpace: 'nowrap' 
    },
    
    komorkaData: { 
      padding: '18px',
      color: '#ccc', 
      fontSize: '17px',
      overflow: 'hidden', 
      textOverflow: 'ellipsis', 
      whiteSpace: 'nowrap' 
    },
    
    komorkaAkcje: { 
      padding: '18px',
      width: '70px'
    },
    
    przyciskUsun: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#e74c3c',
      cursor: 'pointer',
      fontSize: '26px',
      padding: '0 8px',
      transition: 'transform 0.2s',
    },
    
    brakWydatkow: { 
      textAlign: 'center', 
      color: '#aaa', 
      fontStyle: 'italic', 
      padding: '40px',
      fontSize: '18px'
    },
    
    formularzOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2000,
    },
    
    formularz: {
      backgroundColor: '#222',
      padding: '50px',
      borderRadius: '25px',
      width: '90%',
      maxWidth: '800px',
      border: '2px solid #444',
    },
    
    formularzTytul: {
      fontSize: '36px',
      marginBottom: '30px',
      color: '#fff',
    },
    
    formGroup: {
      marginBottom: '25px',
    },
    
    label: {
      display: 'block',
      marginBottom: '10px',
      color: '#ccc',
      fontSize: '20px',
    },
    
    input: {
      width: '100%',
      padding: '18px',
      backgroundColor: '#333',
      border: '2px solid #555',
      borderRadius: '10px',
      color: '#fff',
      fontSize: '18px',
      boxSizing: 'border-box',
    },
    
    select: {
      width: '100%',
      padding: '18px',
      backgroundColor: '#333',
      border: '2px solid #555',
      borderRadius: '10px',
      color: '#fff',
      fontSize: '18px',
      cursor: 'pointer',
    },
    
    textarea: {
      width: '100%',
      padding: '18px',
      backgroundColor: '#333',
      border: '2px solid #555',
      borderRadius: '10px',
      color: '#fff',
      fontSize: '18px',
      minHeight: '120px',
      resize: 'vertical',
      boxSizing: 'border-box',
    },
    
    formularzPrzyciski: {
      display: 'flex',
      gap: '15px',
      marginTop: '30px',
    },
    
    przyciskZapisz: {
      flex: 1,
      padding: '20px',
      backgroundColor: '#27ae60',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '20px',
      fontWeight: '600',
      cursor: 'pointer',
    },
    
    przyciskAnuluj: {
      flex: 1,
      padding: '20px',
      backgroundColor: '#e74c3c',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '20px',
      fontWeight: '600',
      cursor: 'pointer',
    },
    akcjcaContainer: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'center',
      alignItems: 'center',
    },
     przyciskEdycji: {
    backgroundColor: '#f39c12',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'background-color 0.3s, transform 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '42px',
    ':hover': {
      backgroundColor: '#e67e22',
      transform: 'scale(1.05)'
    }
  },

  // Modal dla formularza edycji
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3000,
    backdropFilter: 'blur(5px)'
  },

  modalContent: {
    backgroundColor: '#1a1a2e',
    padding: '40px',
    borderRadius: '20px',
    width: '90%',
    maxWidth: '600px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
    border: '1px solid #333',
    animation: 'slideIn 0.3s ease-out'
  },

  modalTitle: {
    color: '#fff',
    marginBottom: '30px',
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: '600',
    borderBottom: '2px solid #444',
    paddingBottom: '15px'
  },

  modalButtons: {
    display: 'flex',
    gap: '15px',
    marginTop: '30px'
  },

  // Dodaj animację dla modala
  '@keyframes slideIn': {
    from: {
      transform: 'translateY(-50px)',
      opacity: 0
    },
    to: {
      transform: 'translateY(0)',
      opacity: 1
    }
  },

  // Style dla pól formularza w modalu
  modalInput: {
    width: '100%',
    padding: '15px',
    marginBottom: '20px',
    backgroundColor: '#2a2a3a',
    border: '2px solid #444',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '16px',
    transition: 'border-color 0.3s',
    ':focus': {
      borderColor: '#27ae60',
      outline: 'none'
    }
  },

  modalSelect: {
    width: '100%',
    padding: '15px',
    marginBottom: '20px',
    backgroundColor: '#2a2a3a',
    border: '2px solid #444',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    ':focus': {
      borderColor: '#27ae60',
      outline: 'none'
    }
  },

  modalTextarea: {
    width: '100%',
    padding: '15px',
    marginBottom: '20px',
    backgroundColor: '#2a2a3a',
    border: '2px solid #444',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '16px',
    minHeight: '100px',
    resize: 'vertical',
    ':focus': {
      borderColor: '#27ae60',
      outline: 'none'
    }
  },

  // Przycisk zapisu w modalu
  przyciskZapiszEdycje: {
    flex: 1,
    padding: '15px',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    ':hover': {
      backgroundColor: '#219a52',
      transform: 'scale(1.02)'
    }
  },

  // Przycisk anuluj w modalu
  przyciskAnulujEdycje: {
    flex: 1,
    padding: '15px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    ':hover': {
      backgroundColor: '#c0392b',
      transform: 'scale(1.02)'
    }
  },

  // Tooltip dla ikony paragonu
  paragonIcon: {
    marginLeft: '8px',
    color: '#3498db',
    cursor: 'help',
    fontSize: '16px',
    display: 'inline-block',
    transition: 'transform 0.2s',
    ':hover': {
      transform: 'scale(1.1)'
    }
  },

  // Dostosowanie szerokości kolumny akcji
  kolumnaAkcje: {
    width: '120px',
    textAlign: 'center',
    padding: '12px',
    borderBottom: '2px solid #444',
    backgroundColor: '#222',
    color: '#fff',
    fontSize: '18px',
    fontWeight: '600'
  },

  komorkaAkcje: {
    padding: '12px',
    borderBottom: '2px solid #333',
    textAlign: 'center'
  },

  // Dodaj pozostałe istniejące style dla kolumn
  kolumnaKategoria: { 
    width: '20%',
    textAlign: 'left',
    padding: '12px',
    borderBottom: '2px solid #444',
    backgroundColor: '#222',
    color: '#fff',
    fontSize: '18px',
    fontWeight: '600'
  },
  
  kolumnaNazwa: { 
    width: '25%',
    textAlign: 'left',
    padding: '12px',
    borderBottom: '2px solid #444',
    backgroundColor: '#222',
    color: '#fff',
    fontSize: '18px',
    fontWeight: '600'
  },
  
  kolumnaKwota: { 
    width: '15%',
    textAlign: 'left',
    padding: '12px',
    borderBottom: '2px solid #444',
    backgroundColor: '#222',
    color: '#fff',
    fontSize: '18px',
    fontWeight: '600'
  },
  
  kolumnaData: { 
    width: '15%',
    textAlign: 'left',
    padding: '12px',
    borderBottom: '2px solid #444',
    backgroundColor: '#222',
    color: '#fff',
    fontSize: '18px',
    fontWeight: '600'
  },

  // Poprawiony przycisk usuwania dla lepszego wyglądu
  przyciskUsun: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'background-color 0.3s, transform 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '42px',
    ':hover': {
      backgroundColor: '#c0392b',
      transform: 'scale(1.05)'
    },
    spinner: {
  width: '40px',
  height: '40px',
  border: '4px solid #333',
  borderTop: '4px solid #3498db',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite'
}
  },
    kolumnaKategoria: { width: '20%' },
    kolumnaNazwa: { width: '25%' },
    kolumnaKwota: { width: '15%' },
    kolumnaData: { width: '15%' },
    kolumnaAkcje: { width: '25%' },
  };
  
  export default styles;
function Primeira({ foto, nome, inscricoes, onOpenLogin, onLogout, isLoggedIn }) {
    return (
        <>
            {isLoggedIn ? (
                <input
                    type="submit"
                    value="Sair"
                    onClick={onLogout} // Chama a função de logout
                    style={{ backgroundColor: 'red', color: 'white' }}
                />
            ) : (
                <input
                    type="submit"
                    value="Entrar"
                    onClick={onOpenLogin} // Abre o modal de login
                    style={{ backgroundColor: '#22B14C', color: 'white' }}
                />
            )}
            <img src={foto} alt={nome} />
            <h2>{nome}</h2>
            <p>Inscrições: {inscricoes}</p>
        </>
    );
}

export default Primeira;

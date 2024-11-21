import axios from 'axios';
import { useState, useEffect } from 'react';

function Terceira({ nomeCurso, instituicao, foto, comente, like, onOpenLogin, isLoggedIn, idCurso, usuarioLogado }) {
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [comentario, setComentario] = useState('');
    const [comentarios, setComentarios] = useState({});

    const handleCommentClick = () => {
        if (!isLoggedIn) {
            onOpenLogin();
        } else {
            setShowCommentBox(!showCommentBox);
        }
    };

    const handleLikeClick = () => {
        if (!isLoggedIn) {
            onOpenLogin();
        } else {
            console.log("Usuário já está logado. Registrar ação de like.");
        }
    };

    useEffect(() => {
        if (idCurso) {
            axios.get(`http://localhost:3001/api/comentarios/${idCurso}`)
                .then(response => {
                    setComentarios(prevState => ({
                        ...prevState,
                        [idCurso]: response.data,
                    }));
                })
                .catch(error => {
                    console.error("Erro ao buscar comentários:", error);
                    alert('Erro ao carregar os comentários.');
                });
        }
    }, [idCurso]);

    const handleComentarioChange = (e) => {
        setComentario(e.target.value);
    };

    const handleEnviarComentario = (cursoId) => {
        if (comentario.trim() && usuarioLogado) {
            axios.post('http://localhost:3001/api/comentarios', {
                id: usuarioLogado.id,  // Certifique-se de que o id do usuário está correto
                id_curso: cursoId,
                mensagem: comentario
            })
            .then(response => {
                alert('Comentário enviado com sucesso!');
                setComentario('');  // Limpa o campo de comentário
                
                // Se quiser usar o comentário retornado diretamente
                const novoComentario = response.data; // A resposta pode incluir o novo comentário
    
                // Atualiza os comentários
                axios.get(`http://localhost:3001/api/comentarios/${cursoId}`)
                    .then(response => {
                        setComentarios(prevState => ({
                            ...prevState,
                            [cursoId]: response.data,
                        }));
                    })
                    .catch(error => {
                        console.error("Erro ao buscar comentários:", error);
                        alert('Erro ao carregar os comentários.');
                    });
            })
            .catch(error => {
                console.error("Erro ao enviar comentário:", error);
                alert('Falha ao enviar o comentário. Tente novamente.');
            });
        } else if (!usuarioLogado) {
            onOpenLogin();
        } else {
            alert('O comentário não pode estar vazio!');
        }
    };
    
    return (
        <div className="cursos">
            <div className="nomeInst">
                <p>{nomeCurso}</p>
                <p>{instituicao}</p>
            </div>
            <div className="fotoCurso">
                <img className="cursoImg" src={foto} alt={nomeCurso} />
            </div>
            <div className="svgDiv">
                <img className="svg" src={like} alt="like" onClick={handleLikeClick} />
                <img className="svg" src={comente} alt="comentário" onClick={handleCommentClick} />
            </div>

            {showCommentBox && (
                <div className="commentBox">
                    <textarea
                        value={comentario}
                        onChange={handleComentarioChange}
                        placeholder="Escreva seu comentário aqui..."
                        className="textarea"
                    ></textarea>
                    <button
                        onClick={() => handleEnviarComentario(idCurso)}
                        style={{
                            backgroundColor: '#C4C4C4',
                            color: '#000000',
                            float: 'right',
                            marginTop: '10px',
                        }}
                    >
                        Comentar
                    </button>
                </div>
            )}

            {/* Exibe os comentários se houver */}
            {comentarios[idCurso] && comentarios[idCurso].length > 0 ? (
                comentarios[idCurso].map((comentario) => (
                    <div key={comentario.id_comentario}>
                        <p>{comentario.usuario.nome}: {comentario.mensagem}</p>
                    </div>
                ))
            ) : (
                <p>Nenhum comentário disponível para este curso.</p>
            )}
        </div>
    );
}

export default Terceira;


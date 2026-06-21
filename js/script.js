// Base de datos IndexedDB - funciona en archivos locales (file://)
// Sin necesidad de conexion a internet ni dependencias externas

(function() {
    'use strict';

    var DB_NAME = 'VoltTechDB';
    var DB_VERSION = 1;
    var db = null;

    // Inicializar la base de datos IndexedDB
    function initDatabase() {
        return new Promise(function(resolve, reject) {
            if (db) {
                resolve(db);
                return;
            }

            var request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onupgradeneeded = function(event) {
                var database = event.target.result;

                // Crear almacen de comentarios
                if (!database.objectStoreNames.contains('comentarios')) {
                    var storeComments = database.createObjectStore('comentarios', {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    storeComments.createIndex('fecha', 'fecha', { unique: false });
                }

                // Crear almacen de solicitudes
                if (!database.objectStoreNames.contains('solicitudes')) {
                    var storeRequests = database.createObjectStore('solicitudes', {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    storeRequests.createIndex('fecha', 'fecha', { unique: false });
                }

                // Insertar datos de ejemplo
                var transaction = event.target.transaction;

                // Datos de ejemplo - Comentarios
                var commentsStore = transaction.objectStore('comentarios');
                var sampleComments = [
                    {
                        nombre: 'Carlos',
                        apellido: 'Mendoza',
                        correo: 'carlos.mendoza@email.com',
                        calificacion: 5,
                        comentario: 'Excelente servicio, solucionaron mi problema eléctrico en menos de 2 horas. Muy profesionales y con conocimiento técnico. Definitivamente los recomiendo.',
                        fecha: '2026-06-15'
                    },
                    {
                        nombre: 'Ana',
                        apellido: 'Rodriguez',
                        correo: 'ana.rodriguez@email.com',
                        calificacion: 4,
                        comentario: 'Buen trabajo, la instalación quedó impecable. Solo un pequeño retraso en el horario de llegada, pero la calidad del trabajo lo compensó.',
                        fecha: '2026-06-12'
                    },
                    {
                        nombre: 'Luis',
                        apellido: 'Fernandez',
                        correo: 'luis.fernandez@email.com',
                        calificacion: 5,
                        comentario: 'Recomiendo totalmente a VoltTech. Hicieron mantenimiento preventivo a mi planta eléctrica y quedó como nueva.',
                        fecha: '2026-06-10'
                    },
                    {
                        nombre: 'Martha',
                        apellido: 'Gomez',
                        correo: 'martha.gomez@email.com',
                        calificacion: 5,
                        comentario: 'Contrate a VoltTech para la instalación eléctrica de mi nueva vivienda. El trabajo fue rápido, limpio y con materiales de calidad.',
                        fecha: '2026-06-08'
                    },
                    {
                        nombre: 'Jorge',
                        apellido: 'Perez',
                        correo: 'jorge.perez@email.com',
                        calificacion: 3,
                        comentario: 'El servicio fue bueno en general, pero tuvieron que regresar dos veces para ajustar un detalle. Al final quedó bien.',
                        fecha: '2026-06-05'
                    }
                ];

                for (var i = 0; i < sampleComments.length; i++) {
                    commentsStore.add(sampleComments[i]);
                }

                // Datos de ejemplo - Solicitudes
                var requestsStore = transaction.objectStore('solicitudes');
                var sampleRequests = [
                    {
                        tipo: 'Electricidad residencial',
                        nombre: 'Martha',
                        apellido: 'Gomez',
                        direccion: 'Calle 10 #45-20, Bogotá',
                        telefono: '3001234567',
                        mensaje: 'Necesito instalación eléctrica completa para casa nueva de 3 pisos.',
                        estado: 'pendiente',
                        fecha: '2026-06-16'
                    },
                    {
                        tipo: 'Mantenimiento de plantas eléctricas',
                        nombre: 'Roberto',
                        apellido: 'Diaz',
                        direccion: 'Avenida 5 #32-10, Medellín',
                        telefono: '3109876543',
                        mensaje: 'Mantenimiento preventivo para planta eléctrica de 100kW.',
                        estado: 'pendiente',
                        fecha: '2026-06-14'
                    },
                    {
                        tipo: 'Refrigeración',
                        nombre: 'Patricia',
                        apellido: 'Lopez',
                        direccion: 'Calle 82 #15-30, Cali',
                        telefono: '3154567890',
                        mensaje: 'Sistema de refrigeración para restaurante, capacidad 200 metros cuadrados.',
                        estado: 'pendiente',
                        fecha: '2026-06-13'
                    },
                    {
                        tipo: 'Electricidad industrial',
                        nombre: 'Fernando',
                        apellido: 'Reyes',
                        direccion: 'Zona Industrial, Lote 15, Barranquilla',
                        telefono: '3056789012',
                        mensaje: 'Instalacion de tableros eléctricos para planta de procesamiento de alimentos.',
                        estado: 'pendiente',
                        fecha: '2026-06-11'
                    },
                    {
                        tipo: 'Plomería',
                        nombre: 'Carmen',
                        apellido: 'Torres',
                        direccion: 'Calle 25 #8-40, Cartagena',
                        telefono: '3123456789',
                        mensaje: 'Reparación de sistema hidraulico y cambio de tuberías en vivienda.',
                        estado: 'pendiente',
                        fecha: '2026-06-09'
                    }
                ];

                for (var j = 0; j < sampleRequests.length; j++) {
                    requestsStore.add(sampleRequests[j]);
                }
            };

            request.onsuccess = function(event) {
                db = event.target.result;
                console.log('IndexedDB inicializada correctamente');
                resolve(db);
            };

            request.onerror = function(event) {
                console.error('Error al abrir IndexedDB:', event.target.error);
                reject(event.target.error);
            };
        });
    }

    // Funcion generica para obtener todos los registros de un store
    function getAllRecords(storeName) {
        return new Promise(function(resolve, reject) {
            if (!db) {
                initDatabase().then(function() {
                    getAllRecords(storeName).then(resolve).catch(reject);
                }).catch(reject);
                return;
            }

            var transaction = db.transaction([storeName], 'readonly');
            var store = transaction.objectStore(storeName);
            var request = store.getAll();

            request.onsuccess = function() {
                resolve(request.result || []);
            };

            request.onerror = function() {
                reject(request.error);
            };
        });
    }

    // Funcion para agregar un registro
    function addRecord(storeName, data) {
        return new Promise(function(resolve, reject) {
            if (!db) {
                initDatabase().then(function() {
                    addRecord(storeName, data).then(resolve).catch(reject);
                }).catch(reject);
                return;
            }

            var transaction = db.transaction([storeName], 'readwrite');
            var store = transaction.objectStore(storeName);
            var request = store.add(data);

            request.onsuccess = function() {
                resolve(request.result);
            };

            request.onerror = function() {
                reject(request.error);
            };
        });
    }

    // Obtener todos los comentarios
    function getComments() {
        return getAllRecords('comentarios').then(function(comments) {
            // Ordenar por fecha descendente (mas recientes primero)
            comments.sort(function(a, b) {
                return b.id - a.id;
            });
            return comments;
        });
    }

    // Obtener todas las solicitudes
    function getRequests() {
        return getAllRecords('solicitudes').then(function(requests) {
            requests.sort(function(a, b) {
                return b.id - a.id;
            });
            return requests;
        });
    }

    // Insertar un nuevo comentario
    function insertComment(nombre, apellido, correo, calificacion, comentario, fecha) {
        var data = {
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            calificacion: calificacion,
            comentario: comentario,
            fecha: fecha
        };
        return addRecord('comentarios', data);
    }

    // Insertar una nueva solicitud
    function insertRequest(tipo, nombre, apellido, direccion, telefono, mensaje, fecha) {
        var data = {
            tipo: tipo,
            nombre: nombre,
            apellido: apellido,
            direccion: direccion,
            telefono: telefono || '',
            mensaje: mensaje || '',
            estado: 'pendiente',
            fecha: fecha
        };
        return addRecord('solicitudes', data);
    }

    // Obtener estadisticas de calificaciones
    function getRatingStats() {
        return getComments().then(function(comments) {
            var total = comments.length;
            if (total === 0) {
                return { promedio: 0, total: 0, recomendados: 0 };
            }

            var suma = 0;
            var recomendados = 0;
            for (var i = 0; i < comments.length; i++) {
                suma += comments[i].calificacion;
                if (comments[i].calificacion >= 4) {
                    recomendados++;
                }
            }

            return {
                promedio: suma / total,
                total: total,
                recomendados: recomendados
            };
        });
    }

    // Renderizar comentarios
    function renderComments() {
        var container = document.getElementById('commentList');
        if (!container) return;

        getComments().then(function(comments) {
            if (comments.length === 0) {
                container.innerHTML = '<p class="empty-message">No hay comentarios aun. Se el primero en opinar sobre nuestro servicio.</p>';
                return;
            }

            var html = '';
            for (var i = 0; i < comments.length; i++) {
                var c = comments[i];
                var stars = '';
                for (var j = 0; j < 5; j++) {
                    stars += (j < c.calificacion) ? '★' : '☆';
                }
                html += '<div class="comment-item">';
                html += '  <div class="comment-header">';
                html += '    <span class="comment-author">' + c.nombre + ' ' + c.apellido + '</span>';
                html += '    <span class="comment-stars">' + stars + '</span>';
                html += '  </div>';
                html += '  <p class="comment-text">' + c.comentario + '</p>';
                html += '  <div class="comment-meta">' + c.fecha + ' · ' + c.correo + '</div>';
                html += '</div>';
            }
            container.innerHTML = html;
        }).catch(function(error) {
            console.error('Error al renderizar comentarios:', error);
            container.innerHTML = '<p class="empty-message">Error al cargar los comentarios.</p>';
        });
    }

    // Renderizar solicitudes
    function renderRequests() {
        var container = document.getElementById('requestList');
        if (!container) return;

        getRequests().then(function(requests) {
            if (requests.length === 0) {
                container.innerHTML = '<li class="empty-message">No hay solicitudes pendientes en este momento.</li>';
                return;
            }

            var html = '';
            for (var i = 0; i < requests.length; i++) {
                var r = requests[i];
                html += '<li class="request-item">';
                html += '  <strong>' + r.tipo + '</strong>';
                html += '  <div class="request-detail">' + r.nombre + ' ' + r.apellido + ' · ' + r.direccion + '</div>';
                html += '  <div class="request-detail">Tel: ' + (r.telefono || 'No especificado') + ' · Solicitado: ' + r.fecha + '</div>';
                if (r.mensaje) {
                    html += '  <div class="request-detail">Mensaje: ' + r.mensaje + '</div>';
                }
                html += '</li>';
            }
            container.innerHTML = html;
        }).catch(function(error) {
            console.error('Error al renderizar solicitudes:', error);
            container.innerHTML = '<li class="empty-message">Error al cargar las solicitudes.</li>';
        });
    }

    // Actualizar estadisticas
    function updateStats() {
        getRatingStats().then(function(stats) {
            var avgEl = document.getElementById('avgRating');
            var totalEl = document.getElementById('totalComments');
            var recommendEl = document.getElementById('recommendRate');
            var starsEl = document.getElementById('avgStars');

            if (avgEl) {
                avgEl.textContent = stats.promedio ? stats.promedio.toFixed(1) : '0.0';
            }
            if (totalEl) {
                totalEl.textContent = stats.total;
            }
            if (recommendEl) {
                var rate = stats.total > 0 ? (stats.recomendados / stats.total * 100) : 0;
                recommendEl.textContent = Math.round(rate) + '%';
            }
            if (starsEl) {
                var avg = stats.promedio || 0;
                var filled = Math.round(avg);
                var stars = '';
                for (var i = 0; i < 5; i++) {
                    stars += (i < filled) ? '★' : '☆';
                }
                starsEl.textContent = stars;
            }
        }).catch(function(error) {
            console.error('Error al actualizar estadisticas:', error);
        });
    }

    // Configurar estrellas
    function setupStars() {
        var container = document.getElementById('starsContainer');
        if (!container) return;

        var stars = container.querySelectorAll('.star');
        var ratingInput = document.getElementById('calificacion');
        var ratingText = document.getElementById('ratingText');

        function updateStars(value) {
            for (var i = 0; i < stars.length; i++) {
                var val = parseInt(stars[i].dataset.value);
                if (val <= value) {
                    stars[i].classList.add('active');
                } else {
                    stars[i].classList.remove('active');
                }
            }
            if (ratingInput) ratingInput.value = value;
            if (ratingText) {
                var labels = ['', 'Muy malo', 'Malo', 'Regular', 'Bueno', 'Excelente'];
                ratingText.textContent = value > 0 ? labels[value] : 'Selecciona una calificacion';
            }
        }

        for (var i = 0; i < stars.length; i++) {
            (function(index) {
                stars[index].addEventListener('click', function() {
                    var value = parseInt(this.dataset.value);
                    updateStars(value);
                });

                stars[index].addEventListener('mouseover', function() {
                    var value = parseInt(this.dataset.value);
                    for (var j = 0; j < stars.length; j++) {
                        var val = parseInt(stars[j].dataset.value);
                        stars[j].style.color = (val <= value) ? '#f4c430' : '#d1d5db';
                    }
                });

                stars[index].addEventListener('mouseleave', function() {
                    var currentValue = parseInt(ratingInput ? ratingInput.value : 0);
                    for (var j = 0; j < stars.length; j++) {
                        var val = parseInt(stars[j].dataset.value);
                        stars[j].style.color = (val <= currentValue) ? '#f4c430' : '#d1d5db';
                    }
                });
            })(i);
        }

        var initialValue = parseInt(ratingInput ? ratingInput.value : 0);
        if (initialValue > 0) updateStars(initialValue);
    }

    // Manejar formulario de comentarios
    function setupCommentForm() {
        var form = document.getElementById('commentForm');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var nombre = document.getElementById('nombre').value.trim();
            var apellido = document.getElementById('apellido').value.trim();
            var correo = document.getElementById('correo').value.trim();
            var calificacion = parseInt(document.getElementById('calificacion').value) || 0;
            var comentario = document.getElementById('comentario').value.trim();
            var fecha = new Date().toISOString().split('T')[0];

            if (!nombre || !apellido || !correo || !comentario || calificacion === 0) {
                alert('Por favor completa todos los campos y selecciona una calificacion.');
                return;
            }

            insertComment(nombre, apellido, correo, calificacion, comentario, fecha)
                .then(function() {
                    renderComments();
                    updateStats();

                    form.reset();
                    document.getElementById('calificacion').value = '0';
                    var stars = document.querySelectorAll('.star');
                    for (var i = 0; i < stars.length; i++) {
                        stars[i].classList.remove('active');
                        stars[i].style.color = '#d1d5db';
                    }
                    var ratingText = document.getElementById('ratingText');
                    if (ratingText) ratingText.textContent = 'Selecciona una calificacion';

                    alert('Comentario publicado correctamente. Gracias por tu opinion.');
                })
                .catch(function(error) {
                    console.error('Error al insertar comentario:', error);
                    alert('Error al publicar el comentario. Por favor intenta de nuevo.');
                });
        });
    }

    // Manejar formulario de solicitudes
    function setupServiceForm() {
        var form = document.getElementById('serviceForm');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var tipo = document.getElementById('servicioTipo').value;
            var nombre = document.getElementById('nombreCliente').value.trim();
            var apellido = document.getElementById('apellidoCliente').value.trim();
            var direccion = document.getElementById('direccion').value.trim();
            var telefono = document.getElementById('telefono') ? document.getElementById('telefono').value.trim() : '';
            var mensaje = document.getElementById('mensaje') ? document.getElementById('mensaje').value.trim() : '';
            var fecha = new Date().toISOString().split('T')[0];

            if (!tipo || !nombre || !apellido || !direccion) {
                alert('Por favor completa todos los campos obligatorios.');
                return;
            }

            insertRequest(tipo, nombre, apellido, direccion, telefono, mensaje, fecha)
                .then(function() {
                    renderRequests();
                    form.reset();
                    alert('Solicitud enviada correctamente. Te contactaremos a la brevedad.');
                })
                .catch(function(error) {
                    console.error('Error al insertar solicitud:', error);
                    alert('Error al enviar la solicitud. Por favor intenta de nuevo.');
                });
        });
    }

    // Navegacion activa
    function setupNavigation() {
        var links = document.querySelectorAll('.nav-link');
        var currentPath = window.location.pathname.split('/').pop() || 'index.html';

        for (var i = 0; i < links.length; i++) {
            var href = links[i].getAttribute('href');
            if (href === currentPath) {
                links[i].classList.add('active');
            } else {
                links[i].classList.remove('active');
            }
        }
    }

    // Inicializar todo
    function init() {
        initDatabase()
            .then(function() {
                renderComments();
                renderRequests();
                updateStats();
                setupCommentForm();
                setupServiceForm();
                setupStars();
                setupNavigation();
                console.log('VoltTech inicializado correctamente con IndexedDB');
            })
            .catch(function(error) {
                console.error('Error en la inicializacion:', error);
            });
    }

    // Ejecutar cuando el DOM este listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
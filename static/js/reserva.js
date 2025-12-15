document.addEventListener('DOMContentLoaded', function() {
    console.log('Stepper de reserva cargado');

    // Variables principales
    let currentStep = 1;
    const totalSteps = 5;
    
    // Elementos del DOM
    const stepperItems = document.querySelectorAll('.stepper_item');
    const stepContents = document.querySelectorAll('.step_content');
    const btnAnterior = document.getElementById('btn-anterior');
    const btnSiguiente = document.getElementById('btn-siguiente');

    // Función para mostrar un paso específico
    function showStep(stepNumber) {
        // Remover clase active de todos los elementos
        stepperItems.forEach(item => item.classList.remove('active'));
        stepContents.forEach(content => content.classList.remove('active'));

        // Agregar clase active al paso actual
        const currentStepperItem = document.querySelector(`[data-step="${stepNumber}"]`);
        const currentStepContent = document.getElementById(`step-${stepNumber}`);
        
        if (currentStepperItem) currentStepperItem.classList.add('active');
        if (currentStepContent) currentStepContent.classList.add('active');

        // Actualizar estado de botones
        updateNavigationButtons();
    }

    // Función para actualizar botones de navegación
    function updateNavigationButtons() {
        btnAnterior.disabled = currentStep === 1;
        btnSiguiente.disabled = currentStep === totalSteps;

        // Cambiar texto del botón siguiente en el último paso
        if (currentStep === totalSteps) {
            btnSiguiente.textContent = 'Finalizar';
        } else {
            btnSiguiente.textContent = 'Siguiente';
        }
    }

    // Event listeners para los elementos del stepper
    stepperItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const stepNumber = parseInt(this.getAttribute('data-step'));
            currentStep = stepNumber;
            showStep(currentStep);
        });
    });

    // Event listener para botón anterior
    btnAnterior.addEventListener('click', function() {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });

    // Event listener para botón siguiente
    btnSiguiente.addEventListener('click', function() {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
        } else {
            // Aquí puedes agregar lógica para finalizar la reserva
            alert('¡Reserva completada! (Aquí iría la lógica de finalización)');
        }
    });

    // Inicializar la vista
    showStep(currentStep);

    // Funcionalidad para selector de fechas
    const fechaCards = document.querySelectorAll('.fecha_card');
    fechaCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remover selección previa en el mismo contenedor
            const contenedor = this.closest('.fechas_selector');
            contenedor.querySelectorAll('.fecha_card').forEach(c => c.classList.remove('selected'));
            
            // Agregar selección a la fecha clickeada
            this.classList.add('selected');
            
            // Opcional: Cargar vuelos para la fecha seleccionada
            const fechaSeleccionada = this.getAttribute('data-date');
            console.log('Fecha seleccionada:', fechaSeleccionada);
            
            // Aquí puedes agregar lógica para cargar vuelos específicos de esa fecha
            cargarVuelosPorFecha(fechaSeleccionada);
        });
    });

    // Función para cargar vuelos según la fecha (ejemplo)
    function cargarVuelosPorFecha(fecha) {
        console.log('Cargando vuelos para:', fecha);
        // Aquí iría la lógica para cargar vuelos dinámicamente
        // Por ahora solo mostramos los vuelos existentes
    }

    // Funcionalidad para filtros de vuelos
    const filtrosBtns = document.querySelectorAll('.filtro_btn');
    filtrosBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de otros filtros en el mismo contenedor
            const contenedor = this.closest('.filtros_vuelos');
            contenedor.querySelectorAll('.filtro_btn').forEach(b => b.classList.remove('active'));
            
            // Agregar clase active al filtro clickeado
            this.classList.add('active');
            
            // Aquí puedes agregar lógica para ordenar los vuelos
            const tipoFiltro = this.textContent.trim();
            console.log('Filtro aplicado:', tipoFiltro);
            aplicarFiltro(tipoFiltro);
        });
    });

    // Función para aplicar filtros (ejemplo)
    function aplicarFiltro(tipo) {
        const vuelosCards = document.querySelectorAll('.vuelo_card_detallado');
        const vuelosArray = Array.from(vuelosCards);
        
        // Ejemplo de ordenamiento por precio
        if (tipo === 'Precio') {
            vuelosArray.sort((a, b) => {
                const precioA = parseInt(a.querySelector('.precio_valor').textContent.replace(/\D/g, ''));
                const precioB = parseInt(b.querySelector('.precio_valor').textContent.replace(/\D/g, ''));
                return precioA - precioB;
            });
        }
        
        // Ejemplo de ordenamiento por horario
        if (tipo === 'Horario de salida') {
            vuelosArray.sort((a, b) => {
                const horaA = a.querySelector('.vuelo_hora_salida').textContent;
                const horaB = b.querySelector('.vuelo_hora_salida').textContent;
                return horaA.localeCompare(horaB);
            });
        }
        
        // Reordenar elementos en el DOM
        const contenedor = document.querySelector('.vuelos_lista');
        vuelosArray.forEach(vuelo => contenedor.appendChild(vuelo));
    }

    // Funcionalidad para dropdowns de precio
    const dropdownBtns = document.querySelectorAll('.btn_dropdown');
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Aquí puedes agregar lógica para mostrar opciones de precio
            console.log('Dropdown de precio clickeado');
            // Por ejemplo, mostrar diferentes tipos de tarifas
        });
    });

    // Funcionalidad para expandir detalles de vuelo
    const vuelosDetallados = document.querySelectorAll('.vuelo_card_detallado');
    vuelosDetallados.forEach(vuelo => {
        vuelo.addEventListener('click', function(e) {
            // Evitar que se active cuando se hace click en el dropdown
            if (e.target.classList.contains('btn_dropdown')) {
                return;
            }
            
            const vueloId = this.getAttribute('data-vuelo');
            const panel = document.getElementById(`panel-vuelo-${vueloId}`);
            
            if (panel) {
                // Cerrar otros paneles abiertos
                document.querySelectorAll('.vuelo_detalles_panel').forEach(p => {
                    if (p !== panel) {
                        p.classList.remove('active');
                    }
                });
                
                // Toggle del panel actual
                panel.classList.toggle('active');
                
                // Cambiar el ícono del dropdown
                const dropdown = this.querySelector('.btn_dropdown');
                if (panel.classList.contains('active')) {
                    dropdown.textContent = '▲';
                    // Agregar clase para indicar que está expandido
                    this.style.borderRadius = '8px 8px 0 0';
                } else {
                    dropdown.textContent = '▼';
                    this.style.borderRadius = '8px';
                }
            }
        });
    });

    // Funcionalidad para seleccionar tarifa
    const botonesSeleccionarTarifa = document.querySelectorAll('.btn_seleccionar_tarifa');
    botonesSeleccionarTarifa.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que se cierre el panel
            
            // Marcar como seleccionado
            this.textContent = '✓ Seleccionado';
            this.style.background = '#10b981';
            
            // Cerrar el panel después de un momento
            setTimeout(() => {
                const panel = this.closest('.vuelo_detalles_panel');
                panel.classList.remove('active');
                
                // Resetear el dropdown
                const vueloCard = panel.previousElementSibling;
                const dropdown = vueloCard.querySelector('.btn_dropdown');
                dropdown.textContent = '▼';
                vueloCard.style.borderRadius = '8px';
                
                // Auto-avanzar al siguiente paso
                if (currentStep < totalSteps) {
                    currentStep++;
                    showStep(currentStep);
                }
            }, 1500);
        });
    });

    // Funcionalidad adicional para los botones de selección de vuelos
    const botonesSeleccionar = document.querySelectorAll('.btn_seleccionar');
    botonesSeleccionar.forEach(boton => {
        boton.addEventListener('click', function() {
            // Marcar vuelo como seleccionado
            const vueloCard = this.closest('.vuelo_card');
            
            // Remover selección previa de otros vuelos en el mismo paso
            const vuelosEnPaso = vueloCard.closest('.step_content').querySelectorAll('.vuelo_card');
            vuelosEnPaso.forEach(card => card.classList.remove('selected'));
            
            // Agregar selección al vuelo actual
            vueloCard.classList.add('selected');
            
            // Cambiar texto del botón
            this.textContent = 'Seleccionado';
            this.style.background = '#10b981';
            
            // Auto-avanzar al siguiente paso después de 1 segundo
            setTimeout(() => {
                if (currentStep < totalSteps) {
                    currentStep++;
                    showStep(currentStep);
                }
            }, 1000);
        });
    });

    // Validación básica de formularios
    const inputs = document.querySelectorAll('.form_input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '#10b981';
            }
        });
    });

    // Funcionalidad del botón de pago
    const btnPagar = document.querySelector('.btn_pagar');
    if (btnPagar) {
        btnPagar.addEventListener('click', function() {
            // Aquí iría la lógica de procesamiento de pago
            const nombreTitular = document.querySelector('input[placeholder="Nombre del titular"]').value;
            const numeroTarjeta = document.querySelector('input[placeholder="Número de tarjeta"]').value;
            
            if (nombreTitular && numeroTarjeta) {
                this.textContent = 'Procesando...';
                this.disabled = true;
                
                // Simular procesamiento
                setTimeout(() => {
                    alert('¡Pago procesado exitosamente! Tu reserva ha sido confirmada.');
                    this.textContent = '✓ Pago Completado';
                    this.style.background = '#10b981';
                }, 2000);
            } else {
                alert('Por favor completa todos los campos obligatorios');
            }
        });
    }

    console.log('Stepper inicializado correctamente');

    // Funcionalidad para toggle de tarjetas de pasajeros
    const pasajeroToggles = document.querySelectorAll('.pasajero_toggle');
    pasajeroToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const pasajeroCard = this.closest('.pasajero_card');
            const pasajeroContent = pasajeroCard.querySelector('.pasajero_content');
            
            // Toggle la visibilidad del contenido
            if (pasajeroContent.style.display === 'none') {
                pasajeroContent.style.display = 'block';
                this.style.transform = 'rotate(0deg)';
            } else {
                pasajeroContent.style.display = 'none';
                this.style.transform = 'rotate(-90deg)';
            }
        });
    });

    // Funcionalidad para checkbox de viajero frecuente
    const checkboxFrecuente = document.querySelector('.checkbox_frecuente');
    if (checkboxFrecuente) {
        checkboxFrecuente.addEventListener('change', function() {
            const viajeroFrecuenteDiv = this.closest('.viajero_frecuente');
            if (this.checked) {
                viajeroFrecuenteDiv.style.backgroundColor = '#dbeafe';
                viajeroFrecuenteDiv.style.borderColor = '#3b82f6';
                
                // Aquí puedes agregar un campo adicional para el número de viajero frecuente
                console.log('Viajero frecuente activado');
            } else {
                viajeroFrecuenteDiv.style.backgroundColor = '#f0f9ff';
                viajeroFrecuenteDiv.style.borderColor = '#bae6fd';
            }
        });
    }

    // Funcionalidad para botones de navegación de pasajeros
    const btnAtras = document.querySelector('.btn_atras');
    const btnContinuar = document.querySelector('.btn_continuar');
    
    if (btnAtras) {
        btnAtras.addEventListener('click', function() {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
            }
        });
    }
    
    if (btnContinuar) {
        btnContinuar.addEventListener('click', function() {
            // Validar formulario de pasajero antes de continuar
            const inputs = document.querySelectorAll('#step-3 .form_input, #step-3 .form_select');
            let todosCompletos = true;
            
            inputs.forEach(input => {
                if (input.value.trim() === '') {
                    input.style.borderColor = '#ef4444';
                    todosCompletos = false;
                } else {
                    input.style.borderColor = '#10b981';
                }
            });
            
            if (todosCompletos) {
                if (currentStep < totalSteps) {
                    currentStep++;
                    showStep(currentStep);
                }
            } else {
                alert('Por favor completa todos los campos requeridos');
            }
        });
    }

    // Validación en tiempo real para campos de pasajero
    const inputsPasajero = document.querySelectorAll('#step-3 .form_input, #step-3 .form_select');
    inputsPasajero.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '#10b981';
            } else {
                this.style.borderColor = '#d1d5db';
            }
        });
    });

    // Formateo automático para fecha de nacimiento
    const fechaInput = document.querySelector('.fecha_input');
    if (fechaInput) {
        fechaInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, ''); // Solo números
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            if (value.length >= 5) {
                value = value.substring(0, 5) + '/' + value.substring(5, 9);
            }
            this.value = value;
        });
    }

    // Funcionalidad para la sección de reserva
    
    // Toggle de condiciones tarifarias
    const condicionesToggle = document.querySelector('.condiciones_toggle');
    const condicionesContent = document.querySelector('.condiciones_content');
    
    if (condicionesToggle && condicionesContent) {
        condicionesToggle.addEventListener('click', function() {
            condicionesContent.classList.toggle('collapsed');
            
            if (condicionesContent.classList.contains('collapsed')) {
                this.textContent = '▼';
                this.style.transform = 'rotate(0deg)';
            } else {
                this.textContent = '▲';
                this.style.transform = 'rotate(180deg)';
            }
        });
    }

    // Funcionalidad para botones de detalle con paneles deslizantes
    const verDetalleBtns = document.querySelectorAll('.ver_detalle_btn');
    verDetalleBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que se propague al div padre
            const targetId = this.getAttribute('data-target');
            const panel = document.getElementById(targetId);
            
            if (panel) {
                const isActive = panel.classList.contains('active');
                
                // Cerrar otros paneles
                document.querySelectorAll('.detalle_panel').forEach(p => {
                    if (p !== panel) {
                        p.classList.remove('active');
                    }
                });
                
                // Resetear otros botones
                document.querySelectorAll('.ver_detalle_btn').forEach(b => {
                    if (b !== this) {
                        b.classList.remove('active');
                        const text = b.textContent.replace('▲', '▼');
                        b.textContent = text;
                    }
                });
                
                // Toggle del panel actual
                if (isActive) {
                    panel.classList.remove('active');
                    this.classList.remove('active');
                    this.textContent = this.textContent.replace('▲', '▼');
                } else {
                    panel.classList.add('active');
                    this.classList.add('active');
                    this.textContent = this.textContent.replace('▼', '▲');
                }
            }
        });
    });

    // Funcionalidad para hacer clickeable toda la tarjeta del pasajero
    const pasajeroItems = document.querySelectorAll('.pasajero_item');
    pasajeroItems.forEach(item => {
        item.addEventListener('click', function() {
            // Buscar el botón "Ver detalle" dentro de este item
            const verDetalleBtn = this.querySelector('.ver_detalle_btn');
            
            if (verDetalleBtn) {
                // Simular click en el botón
                verDetalleBtn.click();
            }
        });
        
        // Agregar estilo de cursor pointer para indicar que es clickeable
        item.style.cursor = 'pointer';
        
        // Efecto hover
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f0f9ff';
            this.style.borderColor = '#bae6fd';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#f9fafb';
            this.style.borderColor = '#e5e7eb';
        });
    });

    // Funcionalidad para ver detalle de precio con panel deslizante
    const verDetallePrecioBtns = document.querySelectorAll('.ver_detalle_precio_btn');
    verDetallePrecioBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que se propague al div padre
            const targetId = this.getAttribute('data-target');
            const panel = document.getElementById(targetId);
            
            if (panel) {
                const isActive = panel.classList.contains('active');
                const dropdown = document.querySelector('.precio_dropdown');
                
                // Toggle del panel
                if (isActive) {
                    panel.classList.remove('active');
                    this.textContent = 'Ver detalle';
                    if (dropdown) dropdown.classList.remove('rotated');
                } else {
                    panel.classList.add('active');
                    this.textContent = 'Ocultar detalle';
                    if (dropdown) dropdown.classList.add('rotated');
                }
            }
        });
    });

    // Funcionalidad para hacer clickeable toda la sección de precio
    const precioDetalle = document.querySelector('.precio_detalle');
    if (precioDetalle) {
        precioDetalle.addEventListener('click', function() {
            // Buscar el botón "Ver detalle" dentro de esta sección
            const verDetalleBtn = this.querySelector('.ver_detalle_precio_btn');
            
            if (verDetalleBtn) {
                // Simular click en el botón
                verDetalleBtn.click();
            }
        });
        
        // Agregar estilo de cursor pointer para indicar que es clickeable
        precioDetalle.style.cursor = 'pointer';
        
        // Efecto hover
        precioDetalle.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f0f9ff';
            this.style.borderColor = '#bae6fd';
        });
        
        precioDetalle.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#f9fafb';
            this.style.borderColor = '#e5e7eb';
        });
    }

    // Funcionalidad para dropdown de precio (misma funcionalidad)
    const precioDropdownElement = document.querySelector('.precio_dropdown');
    if (precioDropdownElement) {
        precioDropdownElement.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const panel = document.getElementById(targetId);
            const verDetalleBtn = document.querySelector('.ver_detalle_precio_btn');
            
            if (panel && verDetalleBtn) {
                const isActive = panel.classList.contains('active');
                
                // Toggle del panel
                if (isActive) {
                    panel.classList.remove('active');
                    verDetalleBtn.textContent = 'Ver detalle';
                    this.classList.remove('rotated');
                } else {
                    panel.classList.add('active');
                    verDetalleBtn.textContent = 'Ocultar detalle';
                    this.classList.add('rotated');
                }
            }
        });
    }

    // Funcionalidad para checkbox de términos y condiciones
    const checkboxTerminos = document.querySelector('.checkbox_terminos');
    const btnProcederPago = document.querySelector('.btn_proceder_pago');
    
    if (checkboxTerminos && btnProcederPago) {
        // Inicialmente deshabilitar el botón
        btnProcederPago.disabled = true;
        
        checkboxTerminos.addEventListener('change', function() {
            btnProcederPago.disabled = !this.checked;
            
            if (this.checked) {
                btnProcederPago.style.background = '#1e40af';
                btnProcederPago.style.borderColor = '#1e40af';
            } else {
                btnProcederPago.style.background = '#9ca3af';
                btnProcederPago.style.borderColor = '#9ca3af';
            }
        });
    }

    // Funcionalidad para botones de navegación de reserva
    const btnAtrasReserva = document.querySelector('.btn_atras_reserva');
    const btnProcederPagoFinal = document.querySelector('.btn_proceder_pago');
    
    if (btnAtrasReserva) {
        btnAtrasReserva.addEventListener('click', function() {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
            }
        });
    }
    
    if (btnProcederPagoFinal) {
        btnProcederPagoFinal.addEventListener('click', function() {
            if (!this.disabled) {
                if (currentStep < totalSteps) {
                    currentStep++;
                    showStep(currentStep);
                }
            }
        });
    }

    // Funcionalidad para la sección de pago
    
    // Selección de método de pago
    const metodosItems = document.querySelectorAll('.metodo_item');
    const btnContinuarPago = document.querySelector('.btn_continuar_pago');
    
    metodosItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remover selección previa
            metodosItems.forEach(i => i.classList.remove('selected'));
            
            // Agregar selección al método actual
            this.classList.add('selected');
            
            // Marcar el radio button
            const radio = this.querySelector('.metodo_radio');
            if (radio) {
                radio.checked = true;
            }
            
            // Habilitar botón continuar
            if (btnContinuarPago) {
                btnContinuarPago.disabled = false;
            }
        });
    });
    
    // Funcionalidad para radio buttons
    const metodosRadios = document.querySelectorAll('.metodo_radio');
    metodosRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                // Remover selección previa de items
                metodosItems.forEach(item => item.classList.remove('selected'));
                
                // Agregar selección al item padre
                const parentItem = this.closest('.metodo_item');
                if (parentItem) {
                    parentItem.classList.add('selected');
                }
                
                // Habilitar botón continuar
                if (btnContinuarPago) {
                    btnContinuarPago.disabled = false;
                }
            }
        });
    });
    
    // Funcionalidad para botones de navegación de pago
    const btnAtrasPago = document.querySelector('.btn_atras_pago');
    const btnContinuarPagoFinal = document.querySelector('.btn_continuar_pago');
    
    if (btnAtrasPago) {
        btnAtrasPago.addEventListener('click', function() {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
            }
        });
    }
    
    if (btnContinuarPagoFinal) {
        btnContinuarPagoFinal.addEventListener('click', function() {
            if (!this.disabled) {
                const metodoSeleccionado = document.querySelector('.metodo_radio:checked');
                
                if (metodoSeleccionado) {
                    const tipoMetodo = metodoSeleccionado.value;
                    
                    // Simular procesamiento según el método
                    this.textContent = 'Procesando...';
                    this.disabled = true;
                    
                    setTimeout(() => {
                        let mensaje = '';
                        switch(tipoMetodo) {
                            case 'banca':
                                mensaje = '¡Redirigiendo a la banca electrónica! Tu reserva será confirmada al completar el pago.';
                                break;
                            case 'qr':
                                mensaje = '¡Código QR generado! Escanea el código con tu aplicación bancaria para completar el pago.';
                                break;
                            case 'billetera':
                                mensaje = '¡Redirigiendo a tu billetera móvil! Completa el pago para confirmar tu reserva.';
                                break;
                            case 'tarjeta':
                                mensaje = '¡Redirigiendo al procesador de pagos! Ingresa los datos de tu tarjeta para completar la compra.';
                                break;
                            default:
                                mensaje = '¡Pago iniciado! Sigue las instrucciones para completar tu reserva.';
                        }
                        
                        alert(mensaje);
                        this.textContent = '✓ Pago Iniciado';
                        this.style.background = '#10b981';
                    }, 2000);
                }
            }
        });
    }
    
    // Funcionalidad para ver detalle del resumen
    const verDetalleResumenBtn = document.querySelector('.ver_detalle_resumen_btn');
    if (verDetalleResumenBtn) {
        verDetalleResumenBtn.addEventListener('click', function() {
            // Mostrar el mismo detalle que en la sección anterior
            const detalleHTML = `
                <div style="text-align: left; line-height: 1.6;">
                    <h4>Resumen del viaje:</h4>
                    <p><strong>Código de reserva:</strong> HJ76Y2</p>
                    <hr style="margin: 10px 0;">
                    <h4>Desglose del precio:</h4>
                    <p>• Vuelo Santa Cruz → La Paz: BOB 702</p>
                    <p>• Vuelo La Paz → Santa Cruz: BOB 811</p>
                    <p>• Tasas aeroportuarias: BOB 8</p>
                    <hr style="margin: 10px 0;">
                    <p><strong>Total: BOB 1,521</strong></p>
                    <p><small>* Los precios incluyen impuestos y tasas obligatorias</small></p>
                </div>
            `;
            
            // Crear modal
            const modalDiv = document.createElement('div');
            modalDiv.innerHTML = detalleHTML;
            modalDiv.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 2rem;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 1000;
                max-width: 450px;
                width: 90%;
            `;
            
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 999;
            `;
            
            const closeBtn = document.createElement('button');
            closeBtn.textContent = 'Cerrar';
            closeBtn.style.cssText = `
                margin-top: 1rem;
                padding: 0.5rem 1rem;
                background: #1e40af;
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                width: 100%;
            `;
            
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(overlay);
                document.body.removeChild(modalDiv);
            });
            
            overlay.addEventListener('click', function() {
                document.body.removeChild(overlay);
                document.body.removeChild(modalDiv);
            });
            
            modalDiv.appendChild(closeBtn);
            document.body.appendChild(overlay);
            document.body.appendChild(modalDiv);
        });
    }

    // Funcionalidad de QR de pago
    function initQRPago() {
        // Agregar evento al botón de procesar pago
        const btnProcesarPago = document.getElementById('btn-procesar-pago');
        if (btnProcesarPago) {
            btnProcesarPago.addEventListener('click', function() {
                // Verificar que se haya seleccionado un método de pago
                const metodoSeleccionado = document.querySelector('input[name="metodo_pago"]:checked');
                if (metodoSeleccionado && metodoSeleccionado.value === 'qr') {
                    mostrarQRPago();
                } else if (metodoSeleccionado) {
                    // Simular procesamiento para otros métodos
                    alert('Procesando pago con ' + metodoSeleccionado.value + '...');
                } else {
                    alert('Por favor selecciona un método de pago para continuar.');
                }
            });
        }

        // Función para mostrar la sección de QR
        function mostrarQRPago() {
            const metodosPagoSection = document.querySelector('.metodos_pago_section');
            const qrPagoSection = document.getElementById('qr-pago-section');
            
            if (metodosPagoSection && qrPagoSection) {
                metodosPagoSection.style.display = 'none';
                qrPagoSection.style.display = 'block';
                
                // Scroll hacia la sección del QR
                qrPagoSection.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Función para volver a los métodos de pago
        function volverMetodosPago() {
            const metodosPagoSection = document.querySelector('.metodos_pago_section');
            const qrPagoSection = document.getElementById('qr-pago-section');
            
            if (metodosPagoSection && qrPagoSection) {
                qrPagoSection.style.display = 'none';
                metodosPagoSection.style.display = 'block';
                
                // Scroll hacia la sección de métodos de pago
                metodosPagoSection.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Eventos para cerrar QR y volver atrás
        const qrCloseBtn = document.querySelector('.qr_close_btn');
        const btnAtrasQR = document.querySelector('.btn_atras_qr');
        
        if (qrCloseBtn) {
            qrCloseBtn.addEventListener('click', volverMetodosPago);
        }
        
        if (btnAtrasQR) {
            btnAtrasQR.addEventListener('click', volverMetodosPago);
        }

        // Modal de precio en QR
        const btnVerDetalleQR = document.getElementById('ver-detalle-qr');
        const precioModalQR = document.getElementById('precio-modal-qr');
        const precioModalCloseQR = document.querySelector('.precio_modal_close_qr');

        if (btnVerDetalleQR) {
            btnVerDetalleQR.addEventListener('click', function() {
                if (precioModalQR) {
                    precioModalQR.style.display = 'flex';
                }
            });
        }

        if (precioModalCloseQR) {
            precioModalCloseQR.addEventListener('click', function() {
                if (precioModalQR) {
                    precioModalQR.style.display = 'none';
                }
            });
        }

        // Cerrar modal al hacer click fuera
        if (precioModalQR) {
            precioModalQR.addEventListener('click', function(e) {
                if (e.target === precioModalQR) {
                    precioModalQR.style.display = 'none';
                }
            });
        }

        // Agregar evento de click a los items de método de pago para habilitar botón
        const metodosItems = document.querySelectorAll('.metodo_item');
        metodosItems.forEach(item => {
            item.addEventListener('click', function() {
                const radio = this.querySelector('input[type="radio"]');
                if (radio) {
                    radio.checked = true;
                    
                    // Habilitar botón de continuar
                    const btnContinuar = document.querySelector('.btn_continuar_pago');
                    if (btnContinuar) {
                        btnContinuar.disabled = false;
                    }
                    
                    // Actualizar apariencia visual
                    metodosItems.forEach(otherItem => {
                        otherItem.classList.remove('selected');
                    });
                    this.classList.add('selected');
                }
            });
        });
    }

    // Inicializar funcionalidad de QR
    initQRPago();
});
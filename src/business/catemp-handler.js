const NOMINA_1_2_HEADER = ["[nomina12]", "[RFC]", "[Nombre del Empleado]", "[Correo Electrónico]"];
const EMISOR_HEADER = ["", "[emisor]", "[CURP]", "[Registro Patronal]", "[ RFC patrón de origen]"];
const SNCF_HEADER = ["", "", "[SNCF]", "[Origen de recursos]", "[Monto de recursos propio]"];
const RECEPTOR_HEADER = [
	"",
	"[receptor]",
	"[Número de empleado]",
	"[CURP]",
	"[Tipo de Nómina]",
	"[Periodicidad de Pago]",
	"[Entidad Federativa]",
	"[Tipo de contrato]",
	"[Tipo de régimen]",
	"[Número de seguridad social]",
	"[Fecha inicial de la relación laboral]",
	"[Riesgo del puesto]",
	"[Salario diario integrado]",
	"[Salario base, cuotas y aportaciones]",
	"[Departamento]",
	"[Puesto]",
	"[Tipo de Jornada]",
	"[Cuenta bancaria]",
	"[Banco]",
	"[Sindicalizado]",
];
const SUBCONTRATACION_HEADER = ["", "", "[subcontratación]", "[RFCLabora]", "[Porcentaje de tiempo]"];
const DOMICILIO_HEADER = [
	"",
	"",
	"[domicilio]",
	"[País]",
	"[Estado]",
	"[Municipio]",
	"[Localidad]",
	"[Colonia]",
	"[Calle]",
	"[No. Exterior]",
	"[No. Interior]",
	"[Código postal]",
	"[Teléfono]",
	"[Referencia]",
];
const INFORMACION_ADICIONAL_HEADER = ["", "", "[informacionadicional]", "[Activo]"];
const PERCEPCIONES_HEADERS = [
	["", "[Percepciones]"],
	["", "Percepciones"],
];
const PERCEPCION_HEADER = [
	"",
	"",
	"[percepción]",
	"[Tipo percepción]",
	"[Clave]",
	"[Concepto]",
	"[Importe Gravado]",
	"[Importe Exento]",
];
const HORAS_EXTRA_HEADER = [
	"",
	"",
	"",
	"[Horas extra]",
	"[Tipo de horas]",
	"[Días]",
	"[Horas extra]",
	"[Importe pagado]",
];
const ACCIONES_Y_TITULOS_HEADER = [
	"",
	"",
	"",
	"[Acciones y títulos]",
	"[Valor en el mercado]",
	"[Precio al otorgarse]",
];
const JUBILACION_HEADER = [
	"",
	"",
	"[jubilación]",
	"[Total una exhibición]",
	"[Total parcialidad]",
	"[Monto diario]",
	"[Ingreso acumulable]",
	"[Ingreso no acumulable]",
];
const SEPARACION_HEADER = [
	"",
	"",
	"[separación]",
	"[Último sueldo mensual ordinario]",
	"[Ingreso acumulable]",
	"[Ingreso no acumulable]",
	"[Total pagado]",
	"[Número de años de servicio]",
];
const DEDUCCION_HEADER = ["", "[deducción]", "[Tipo de deducción]", "[Clave]", "[Concepto]", "[Importe]"];
const OTROS_PAGOS_HEADER = ["", "[Otros Pagos]", "[Tipo otro pago]", "[Clave]", "[Concepto]", "[Importe]"];
const SUBSIDIO_AL_EMPLEO_HEADER = ["", "", "[Subsidio al empleo]", "[Subsidio causado]"];
const COMPENSACION_SALDO_A_FAVOR_HEADER = [
	"",
	"",
	"[compensación saldo a favor]",
	"[Saldo a favor]",
	"[Año]",
	"[Remantente saldo a favor]",
];
const INCAPACIDAD_HEADER = [
	"",
	"[Incapacidad]",
	"[Días de incapacidad]",
	"[Tipo de incapacidad]",
	"[Importe monetario]",
];
const BEGINNING_NOMINA_1_2 = ["nomina12"];
const BEGINNING_PERCEPCION = ["", "", "percepcion"];
const BEGINNING_DEDUCCION = ["", "deduccion"];
const BEGINNING_OTRO_PAGO = ["", "otrospagos"];
const BEGINNING_EMISOR = ["", "emisor"];
const BEGINNING_RECEPTOR = ["", "receptor"];
const BEGINNING_DOMICILIO = ["", "", "domicilio"];
const BEGINNING_INFORMACION_ADICIONAL = ["", "", "informacionadicional"];
const BEGINNING_SUBSIDIO_AL_EMPLEO = ["", "", "subsidioalempleo"];

export const buildNominas = csv => {
	const rowsArray = csvToArray(csv).map(row => trimEndArray(row));

	// encontrar y separar cada nomina (arrays)
	let indexEnd = rowsArray.length;
	let slices = [];
	for (let index = rowsArray.length - 1; index >= 0; index--) {
		const row = rowsArray[index];
		if (isEqualsArray(row, NOMINA_1_2_HEADER)) {
			slices.push(rowsArray.slice(index, indexEnd));
			indexEnd = index;
		}
	}

	let nominas = [];
	slices.reverse().forEach(slice => {
		const nomina = new Nomina12();
		for (let i = 0; i < slice.length; i++) {
			const row = slice[i];
			const nextRow = i + 1 < slice.length ? slice[i + 1] : null;

			if (isEqualsArray(row, NOMINA_1_2_HEADER)) {
				nomina.setNomina({ rfc: nextRow[1], nombre: nextRow[2], correoElectronico: nextRow[3] });
			} else if (isEqualsArray(row, EMISOR_HEADER)) {
				nomina.setEmisor({ curp: nextRow[2], registroPatronal: nextRow[3], rfc: nextRow[4] });
			} else if (isEqualsArray(row, RECEPTOR_HEADER)) {
				nomina.setReceptor({
					numeroDeEmpleado: nextRow[2],
					curp: nextRow[3],
					tipoDeNomina: nextRow[4],
					periocidadDelPago: nextRow[5],
					entidadFederativa: nextRow[6],
					tipoDeContrato: nextRow[7],
					tipoDeRegimen: nextRow[8],
					numeroDeSeguridadSocial: nextRow[9],
					fechaInicialDeLaRelacionLaboral: nextRow[10],
					riesgoDelPuesto: nextRow[11],
					salarioDiarioIntegrado: nextRow[12],
					salarioBaseCuotasYAportaciones: nextRow[13],
					departamento: nextRow[14],
					puesto: nextRow[15],
					tipoDeJornada: nextRow[16],
					cuentaBancaria: nextRow[17],
					banco: nextRow[18],
					sindicalizado: nextRow[19],
				});
			} else if (isEqualsArray(row, DOMICILIO_HEADER)) {
				nomina.setDomicilio({
					pais: nextRow[3],
					estado: nextRow[4],
					municipio: nextRow[5],
					localidad: nextRow[6],
					colonia: nextRow[7],
					calle: nextRow[8],
					numeroExterior: nextRow[9],
					numeroInterior: nextRow[10],
					codigoPostal: nextRow[11],
					telefono: nextRow[12],
					referencia: nextRow[13],
				});
			} else if (isEqualsArray(row, INFORMACION_ADICIONAL_HEADER)) {
				nomina.setInformacionAdicional({ activo: nextRow[3] });
			}
		}
		nominas.push(nomina);
	});

	return nominas;
};

const buildArray = nomina => {};

class Nomina12 {
	constructor() {
		this.percepciones = [];
		this.deducciones = [];
		this.otrosPagos = [];
	}

	setNomina = ({ rfc, nombre, correoElectronico }) => {
		this.rfc = rfc;
		this.nombre = nombre;
		this.correoElectronico = correoElectronico;
		return this;
	};

	setEmisor = ({ curp, registroPatronal, rfc }) => {
		this.emisor = {
			curp: curp,
			registroPatronal: registroPatronal,
			rfc: rfc,
		};
		return this;
	};

	setReceptor = ({
		numeroDeEmpleado,
		curp,
		tipoDeNomina,
		periocidadDelPago,
		entidadFederativa,
		tipoDeContrato,
		tipoDeRegimen,
		numeroDeSeguridadSocial,
		fechaInicialDeLaRelacionLaboral,
		riesgoDelPuesto,
		salarioDiarioIntegrado,
		salarioBaseCuotasYAportaciones,
		departamento,
		puesto,
		tipoDeJornada,
		cuentaBancaria,
		banco,
		sindicalizado,
	}) => {
		this.receptor = {
			numeroDeEmpleado: numeroDeEmpleado,
			curp: curp,
			tipoDeNomina: tipoDeNomina,
			periocidadDelPago: periocidadDelPago,
			entidadFederativa: entidadFederativa,
			tipoDeContrato: tipoDeContrato,
			tipoDeRegimen: tipoDeRegimen,
			numeroDeSeguridadSocial: numeroDeSeguridadSocial,
			fechaInicialDeLaRelacionLaboral: fechaInicialDeLaRelacionLaboral,
			riesgoDelPuesto: riesgoDelPuesto,
			salarioDiarioIntegrado: salarioDiarioIntegrado,
			salarioBaseCuotasYAportaciones: salarioBaseCuotasYAportaciones,
			departamento: departamento,
			puesto: puesto,
			tipoDeJornada: tipoDeJornada,
			cuentaBancaria: cuentaBancaria,
			banco: banco,
			sindicalizado: sindicalizado,
		};
		return this;
	};

	setDomicilio = ({
		pais,
		estado,
		municipio,
		localidad,
		colonia,
		calle,
		numeroExterior,
		numeroInterior,
		codigoPostal,
		telefono,
		referencia,
	}) => {
		if (this.receptor) {
			this.receptor.domicilio = {
				pais: pais,
				estado: estado,
				municipio: municipio,
				localidad: localidad,
				colonia: colonia,
				calle: calle,
				numeroExterior: numeroExterior,
				numeroInterior: numeroInterior,
				codigoPostal: codigoPostal,
				telefono: telefono,
				referencia: referencia,
			};
		}
		return this;
	};

	setInformacionAdicional = ({ activo }) => {
		if (this.receptor) {
			this.receptor.informacionAdicional = {
				activo: activo,
			};
		}
		return this;
	};

	setSubsidioAlEmpleo = ({ subsidioCausado }) => {
		this.subsidioAlEmpleo = {
			subsidioCausado: subsidioCausado,
		};
		return this;
	};

	setOptions = ({ tipo, periodicidad }) => {
		this.receptor.tipoDeNomina = tipo;
		this.receptor.periocidadDelPago = periodicidad.startsWith("'") ? periodicidad : `'${periodicidad}`;
		return this;
	};

	agregarPercepcion = (tipo, clave, concepto, importeGravado, importeExento) => {
		tipo = tipo.startsWith("'") ? tipo : `'${tipo}`;
		clave = clave.startsWith("'") ? clave : `'${clave}`;
		concepto = concepto.startsWith("'") ? concepto : `'${concepto}`;
		this.percepciones.push({
			tipo: tipo,
			clave: clave,
			concepto: concepto,
			importeGravado: importeGravado,
			importeExento: importeExento,
		});
		return this;
	};

	agregarDeduccion = (tipo, clave, concepto, importe) => {
		tipo = tipo.startsWith("'") ? tipo : `'${tipo}`;
		clave = clave.startsWith("'") ? clave : `'${clave}`;
		concepto = concepto.startsWith("'") ? concepto : `'${concepto}`;
		this.deducciones.push({
			tipo: tipo,
			clave: clave,
			concepto: concepto,
			importe: importe,
		});
		return this;
	};

	agregarOtroPago = (tipo, clave, concepto, importe) => {
		tipo = tipo.startsWith("'") ? tipo : `'${tipo}`;
		clave = clave.startsWith("'") ? clave : `'${clave}`;
		concepto = concepto.startsWith("'") ? concepto : `'${concepto}`;
		this.otrosPagos.push({
			tipo: tipo,
			clave: clave,
			concepto: concepto,
			importe: importe,
		});
		return this;
	};

	vaciarPercepciones = () => {
		this.percepciones = [];
		return this;
	};

	vaciarDeducciones = () => {
		this.deducciones = [];
		return this;
	};

	vaciarOtrosPagos = () => {
		this.otrosPagos = [];
		return this;
	};

	calcularSueldoAPagar = () => {
		let calculado = 0.0;

		calculado = this.percepciones.reduce(
			(prev, curr) => prev + (+curr.importeGravado || 0) + (+curr.importeExento || 0),
			0
		);
		calculado += this.otrosPagos.reduce((prev, curr) => prev + (+curr.importe || 0), 0);
		calculado -= this.deducciones.reduce((prev, curr) => prev + (+curr.importe || 0), 0);

		return calculado.toFixed(2);
	};

	hasSubsidioAlEmpleo = () => this.otrosPagos.map(otroPago => otroPago.clave).includes("002");

	isValid = () =>
		this.rfc !== undefined &&
		this.nombre !== undefined &&
		this.correoElectronico !== undefined &&
		this.receptor !== undefined &&
		this.receptor !== undefined;

	toArrays = () => {
		var output = [];
		output.push(NOMINA_1_2_HEADER, [...BEGINNING_NOMINA_1_2, ...[this.rfc, this.nombre, this.correoElectronico]]);
		if (this.emisor !== undefined) {
			output.push(EMISOR_HEADER, [
				...BEGINNING_EMISOR,
				...[this.emisor.curp, this.emisor.registroPatronal, this.emisor.rfc],
			]);
		}
		if (this.receptor !== undefined) {
			output.push(RECEPTOR_HEADER, [
				...BEGINNING_RECEPTOR,
				...[
					this.receptor.numeroDeEmpleado,
					this.receptor.curp,
					this.receptor.tipoDeNomina,
					this.receptor.periocidadDelPago,
					this.receptor.entidadFederativa,
					this.receptor.tipoDeContrato,
					this.receptor.tipoDeRegimen,
					this.receptor.numeroDeSeguridadSocial,
					this.receptor.fechaInicialDeLaRelacionLaboral,
					this.receptor.riesgoDelPuesto,
					this.receptor.salarioDiarioIntegrado,
					this.receptor.salarioBaseCuotasYAportaciones,
					this.receptor.departamento,
					this.receptor.puesto,
					this.receptor.tipoDeJornada,
					this.receptor.cuentaBancaria,
					this.receptor.banco,
					this.receptor.sindicalizado,
				],
			]);
		}
		if (this.receptor.domicilio !== undefined) {
			var domicilio = this.receptor.domicilio;
			output.push(DOMICILIO_HEADER, [
				...BEGINNING_DOMICILIO,
				...[
					domicilio.pais,
					domicilio.estado,
					domicilio.municipio,
					domicilio.localidad,
					domicilio.colonia,
					domicilio.calle,
					domicilio.numeroExterior,
					domicilio.numeroInterior,
					domicilio.codigoPostal,
					domicilio.telefono,
					domicilio.referencia,
				],
			]);
		}
		if (this.receptor.informacionAdicional !== undefined) {
			output.push(INFORMACION_ADICIONAL_HEADER, [
				...BEGINNING_INFORMACION_ADICIONAL,
				...[this.receptor.informacionAdicional.activo],
			]);
		}
		if (this.percepciones.length !== 0) {
			output.push(...PERCEPCIONES_HEADERS, PERCEPCION_HEADER);
			this.percepciones.forEach(percepcion => {
				output.push([
					...BEGINNING_PERCEPCION,
					...[
						percepcion.tipo,
						percepcion.clave,
						percepcion.concepto,
						percepcion.importeGravado,
						percepcion.importeExento,
					],
				]);
			});
		}
		if (this.deducciones.length !== 0) {
			output.push(DEDUCCION_HEADER);
			this.deducciones.forEach(deduccion => {
				output.push([
					...BEGINNING_DEDUCCION,
					...[deduccion.tipo, deduccion.clave, deduccion.concepto, deduccion.importe],
				]);
			});
		}
		if (this.otrosPagos.length !== 0) {
			output.push(OTROS_PAGOS_HEADER);
			this.otrosPagos.forEach(otroPago => {
				output.push([
					...BEGINNING_OTRO_PAGO,
					...[otroPago.tipo, otroPago.clave, otroPago.concepto, otroPago.importe],
				]);
				if (otroPago.tipo === "'002") {
					// Si el valor de Nomina.OtrosPagos.OtroPago.TipoOtroPago es 002 es obligatorio el nodo SubsidioAlEmpleo.
					if (this.subsidioAlEmpleo !== undefined) {
						output.push(SUBSIDIO_AL_EMPLEO_HEADER, [
							...BEGINNING_SUBSIDIO_AL_EMPLEO,
							...[this.subsidioAlEmpleo.subsidioCausado],
						]);
					}
				}
			});
		}

		return output;
	};

	toCSV = () => {
		const arrays = this.toArrays();
		let csvContent = "";
		arrays.forEach((array, index) => {
			csvContent += array.join(",");
			if (index < arrays.length - 1) {
				csvContent += "\r\n";
			}
		});
		return csvContent;
	};

	clone = () =>
		new Nomina12()
			.setNomina({ ...this })
			.setEmisor({ ...this?.emisor })
			.setReceptor({ ...this?.receptor })
			.setDomicilio({ ...this?.receptor?.domicilio })
			.setInformacionAdicional({ ...this?.receptor?.informacionAdicional })
			.setSubsidioAlEmpleo({ ...this?.subsidioAlEmpleo });
}

const trimEndArray = array => {
	let i = array.length - 1;
	let output = array;
	while (output[i--] === "") {
		output.pop();
	}
	return output;
};

const isEqualsArray = (array1, array2) => {
	if (array1.length !== array2.length) {
		return false;
	}
	for (let i = 0; i < array1.length; i++) {
		if (array1[i] !== array2[i]) {
			return false;
		}
	}
	return true;
};

const csvToArray = text => {
	if (!text) {
		return [];
	}
	let p = "",
		row = [""],
		ret = [row],
		i = 0,
		r = 0,
		s = !0,
		l;
	for (l of text) {
		if ('"' === l) {
			if (s && l === p) row[i] += l;
			s = !s;
		} else if ("," === l && s) l = row[++i] = "";
		else if ("\n" === l && s) {
			if ("\r" === p) row[i] = row[i].slice(0, -1);
			row = ret[++r] = [(l = "")];
			i = 0;
		} else row[i] += l;
		p = l;
	}
	return ret;
};

type Props = {
	params: Promise<{ id: string }>;
};

export default async function DetalleOrdenPage({ params }: Props) {
	const { id } = await params;

	return <h1>Detalle de Orden: {id}</h1>;
}

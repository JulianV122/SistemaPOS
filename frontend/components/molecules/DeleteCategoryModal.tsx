interface DeleteCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    categoryName: string;
}

export function DeleteCategoryModal({ isOpen, onClose, onConfirm, categoryName }: DeleteCategoryModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-black">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
                <p className="mb-6">
                    ¿Estás seguro que deseas eliminar la categoría <span className="font-semibold">{categoryName}</span>? 
                    Esta acción eliminará también todos los productos asociados a esta categoría.
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
} 
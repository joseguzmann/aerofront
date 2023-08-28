import firebase_admin
from firebase_admin import credentials, firestore
import random
import string
import datetime
import os

# Inicializar Firebase
cred_file_path = os.path.join(os.path.dirname(__file__), "aeroback-e0403-firebase-adminsdk-gen9t-5e96664fd9.json")
cred = credentials.Certificate(cred_file_path)

firebase_admin.initialize_app(cred)

# Datos disponibles
destinos = ["AD","AR","ES","EC","GB","AU","FR"]

precios_disponibles = range(70, 501)

# Función para generar un ID aleatorio
def generate_id():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))

#Crear documentos en la colección 'vuelo'
def create_documents(num_docs):
    db = firestore.client()
    for _ in range(num_docs):
        destino = random.choice(destinos)
        origen = random.choice(destinos)
        while origen == destino:
            origen = random.choice(destinos)
        precio = random.choice(precios_disponibles)
        duracion = f"{random.randint(2, 23)}H:{random.randint(0, 59)}mm"
        fecha_salida = datetime.datetime.now() + datetime.timedelta(days=random.randint(1, 30))
        
        data = {
            'destino': destino,
            'disponibles': 30,
            'duracion': duracion,
            'fecha_salida': fecha_salida,
            'id': '',
            'origen': origen,
            'precio': precio
        }
        
        doc_ref = db.collection('vuelo').document()
        data['id'] = doc_ref.id
        doc_ref.set(data)
        
        # Crear subcolección 'seatsFlight'
        seats_format_ref = db.collection('seatsFormat').get()
        for seat_doc in seats_format_ref:
            seat_data = seat_doc.to_dict()
            db.collection('vuelo').document(doc_ref.id).collection('seatsFlight').document(seat_doc.id).set(seat_data)




if __name__ == "__main__":
    num_documents_to_create = int(input("Ingrese la cantidad de documentos a crear: "))
    create_documents(num_documents_to_create)
    print("Documentos creados exitosamente.")

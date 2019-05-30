from keras.models import load_model
from keras_preprocessing.image import load_img, img_to_array
import numpy as np
import tensorflow as tf


# load model
model_path = 'saved_models/digit_99.h5'
convnet = load_model(model_path)
graph = tf.get_default_graph()

nep_numbers = ['o', '१' ,'२' , '३', '४', '५', '६', '७', '८', '९']

def predict_character(image_file):
    global graph
    with graph.as_default():
        image_loaded = load_img(image_file,target_size=(32,32),color_mode='grayscale')
        img_arr = (img_to_array(image_loaded)/255.0).reshape(1,32,32,1)
        probabilities = convnet.predict(img_arr)
        pred = np.argmax(probabilities)
        return nep_numbers[pred], np.amax(probabilities)
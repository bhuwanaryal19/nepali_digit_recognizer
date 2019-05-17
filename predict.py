from keras.models import load_model
from keras_preprocessing.image import load_img, img_to_array
import numpy as np
import tensorflow as tf


from config import char2idx

idx2char = {value: key for key, value in char2idx.items()}
print(idx2char)

# load model
model_path = 'saved_models/clf5.h5'
convnet = load_model(model_path)
graph = tf.get_default_graph()


def predict_character(image_file):
    global graph
    with graph.as_default():
        image_loaded = load_img(image_file,target_size=(32,32),color_mode='grayscale')
        img_arr = (img_to_array(image_loaded)/255.0).reshape(1,32,32,1)
        pred = np.argmax(convnet.predict(img_arr))
        return idx2char[pred]
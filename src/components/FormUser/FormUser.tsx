import React from 'react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import supabase from '../../supabase';
import './style.scss';

interface FormData {
  name: string;
  description: string;
  platform: string;
  img: string | null;
  vote: number;
}

interface LoginFormProps {
  closePanel: (state: boolean) => void;
  fetchData: () => Promise<void>;
}
const FormUser: React.FC<LoginFormProps> = ({ closePanel, fetchData }) => {
  async function getBase64ImageFromUrl(imageUrl: any) {
    const res = await fetch(imageUrl);
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        function () {
          resolve(reader.result);
        },
        false
      );
      reader.readAsDataURL(blob);
    });
  }
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      platform: '',
      img: null,
    },
    onSubmit: async (values: any, actions: any) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const img = URL.createObjectURL(values.product_img);
      const imgBase64 = await getBase64ImageFromUrl(img);

      await supabase.from('stremers').insert({
        name: values.name,
        description: values.description,
        platform: values.platform,
        vote: values.vote,
        img: imgBase64,
      });
      closePanel(false);
      fetchData();
      actions.resetForm();
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="cont-form">
        <FontAwesomeIcon
          icon={faXmark}
          style={{ color: '#ffffff' }}
          size="xl"
          className="close"
          onClick={() => closePanel(false)}
        />
        <div className="input-cont">
          <h2 className="user-panel-title">Add Favorite Stremer </h2>
          <input
            name="name"
            value={formik.values.name}
            placeholder="Name"
            className="user-panel-input"
            onChange={formik.handleChange}
          />
          <h3 className="user-panel-title">Platform</h3>
          <select
            className="user-panel-input"
            name="platform"
            value={formik.values.platform}
            onChange={formik.handleChange}
          >
            <option value="">Select an option</option>
            <option value="Twitch">Twitch</option>
            <option value="YouTube">YouTube</option>
            <option value="Kick">Kick</option>
            <option value="TikTok">TikTok</option>
            <option value="Rumble">Rumble</option>
          </select>
          <h3 className="user-panel-title">Description</h3>
          <textarea
            className="text-area-description"
            name="description"
            placeholder=""
            value={formik.values.description}
            rows={5}
            cols={35}
            onChange={formik.handleChange}
          ></textarea>
          <h3 className="user-panel-title">Picture Choose The File</h3>
          <input
            type="file"
            name="img"
            accept="image/*"
            onChange={(event) => {
              formik.setFieldValue(
                'product_img',
                event.currentTarget.files && event.currentTarget.files[0]
              );
            }}
            className="file-input"
          />
        </div>
        <div className="user-panel-btn-cont">
          <button className="user-panel-btn" type="submit">
            Add Stremer
          </button>
        </div>
      </form>
    </>
  );
};

export default FormUser;

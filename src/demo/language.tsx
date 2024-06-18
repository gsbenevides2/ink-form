import { render } from 'ink';
import React from 'react';
import { Form } from '../Form.js';
import ptBRLanguage from '../language/ptBR.js';

const options = [
  {label: 'Millenium Falcon', value: 'falcon'},
  {label: 'TIE Advanced X1', value: 'tieadv'},
  {label: 'X-Wing', value: 'xwing'},
  {label: 'Raizorcrest', value: 'mando'},
];

render(
  <Form
    onSubmit={value => console.log(`Submitted: `, value)}
    language={ptBRLanguage}
    form={{
      title: "Título do Formulário",
      sections: [
        {
          title: "Campos de texto",
          fields: [
            { type: 'string', name: 'field1', label: 'Input com valor inicial', initialValue: 'Valor Inicial' },
            { type: 'string', name: 'field2', label: 'Input com Mascara', mask: '*' },
            { type: 'string', name: 'field3', label: 'Input com placeholder, descrição e obrigatório', placeholder: 'Placeholder', required: true, description: 'Olá eu sou uma descrição'},
            { type: 'string', name: 'field4-semLabel' },
            { type: 'string', name: 'field5', label: 'Regex, mas somente urls', regex: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/ },
          ]
        },
        {
          title: "Campos Numéricos",
          fields: [
            { type: 'integer', name: 'field10', label: 'Inteiro' },
            { type: 'integer', name: 'field11', label: 'Inteiro entre -5 e 8 pulando de 2 em 2', min: -5, max: 8, step: 2 },
            { type: 'float', name: 'field12', label: 'Ponto flutuante' },
            { type: 'float', name: 'field13', label: 'Ponto Flutuante entre 0 e 5, pulando de 0.1 em 0.1', min: 0, max: 5, step: .1 },
          ]
        },
        {
          title: "Campo de Seleção",
          fields: [
            { type: 'select', name: 'field20', label: 'Seletor', options },
          ]
        },
        {
          title: 'Seção de Ajuda',
          description: [
            'Você pode usar uma seção sem campos e apenas um atributo de descrição para seções de documentação adicionais.',
            'Esta seção, por exemplo, pode ajudar como uma página de ajuda.',
            'Você também pode adicionar páginas "Sobre", "Leia-me" ou diferentes.',
          ],
          fields: [],
        }
      ]
    }}
  />
);

import { TextField, Button, Container, IconButton, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default function ProdutoForm({
  title,
  handleSubmit,
  formData,
  setFormData,
}) {
  return (
    <Container maxWidth="sm">
      <form
        className="flex flex-col gap-4 mb-8"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h1 className="text-center text-xl font-semibold">{title}</h1>
        <TextField
          required
          label="Nome"
          id="nome"
          value={formData.nome}
          onChange={(e) => {
            setFormData({ ...formData, nome: e.target.value });
          }}
        />

        <TextField
          required
          label="Preço de compra"
          id="precoCompra"
          type="number"
          slotProps={{
            htmlInput: {
              step: 0.01,
              min: 0,
            },
          }}
          value={formData.precoCompra}
          onChange={(e) => {
            setFormData({
              ...formData,
              precoCompra: parseFloat(e.target.value),
            });
          }}
        />

        <TextField
          required
          label="Preço de venda"
          id="precoVenda"
          type="number"
          slotProps={{
            htmlInput: {
              step: 0.01,
              min: 0,
            },
          }}
          value={formData.precoVenda}
          onChange={(e) => {
            setFormData({
              ...formData,
              precoVenda: parseFloat(e.target.value),
            });
          }}
        />

        <h3 className="font-semibold text-xl mt-10 text-center">
          Comissões e taxas
        </h3>

        <div className="grid grid-cols-3 gap-1">
          {[10, 13, 15].map((comissao, index) => (
            <Button
              key={index}
              variant="outlined"
              onClick={() => {
                setFormData({
                  ...formData,
                  porcentagemComissaoCompra: comissao,
                  valorFixoComissaoCompra: 0,
                });
              }}
            >
              {comissao}%
            </Button>
          ))}
        </div>

        <TextField
          required
          label="Comissão (%)"
          id="porcentagemComissaoCompra"
          type="number"
          slotProps={{
            htmlInput: {
              step: 0.01,
              min: 0,
            },
          }}
          value={formData.porcentagemComissaoCompra}
          onChange={(e) => {
            setFormData({
              ...formData,
              porcentagemComissaoCompra: e.target.value,
            });
          }}
        />

        <TextField
          required
          label="Comissão fixa (R$)"
          id="valorFixoComissaoCompra"
          type="number"
          slotProps={{
            htmlInput: {
              step: 0.01,
              min: 0,
            },
          }}
          value={formData.valorFixoComissaoCompra}
          onChange={(e) => {
            setFormData({
              ...formData,
              valorFixoComissaoCompra: parseFloat(e.target.value),
            });
          }}
        />

        <div className="grid grid-cols-2 gap-1 mt-10">
          {[
            { porcentagem: 16, fixo: 20 },
            { porcentagem: 11, fixo: 20 },
          ].map((taxa, index) => (
            <Button
              key={index}
              variant="outlined"
              onClick={() => {
                setFormData({
                  ...formData,
                  porcentagemTaxaVenda: taxa.porcentagem,
                  valorFixoTaxaVenda: taxa.fixo,
                });
              }}
            >
              Premium ({taxa.porcentagem}% + R$ {taxa.fixo})
            </Button>
          ))}
        </div>

        <TextField
          required
          label="Taxa (%)"
          id="porcentagemTaxaVenda"
          type="number"
          slotProps={{
            htmlInput: {
              step: 0.01,
              min: 0,
            },
          }}
          value={formData.porcentagemTaxaVenda}
          onChange={(e) => {
            setFormData({
              ...formData,
              porcentagemTaxaVenda: e.target.value,
            });
          }}
        />

        <TextField
          required
          label="Taxa fixa (R$)"
          id="valorFixoTaxaVenda"
          type="number"
          slotProps={{
            htmlInput: {
              step: 0.01,
              min: 0,
            },
          }}
          value={formData.valorFixoTaxaVenda}
          onChange={(e) => {
            setFormData({
              ...formData,
              valorFixoTaxaVenda: parseFloat(e.target.value),
            });
          }}
        />

        <h3 className="font-semibold text-xl mt-10 text-center">
          Links de compra
        </h3>
        {formData.linksDeCompra.map((link, index) => (
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={1}
            key={`link-compra-${index}`}
          >
            <TextField
              required
              fullWidth
              label={`Link de compra ${index + 1}`}
              id={`link-compra-${index}`}
              value={link.url}
              onChange={(e) => {
                const links = formData.linksDeCompra;
                links[index] = { url: e.target.value };
                setFormData({ ...formData, linksDeCompra: links });
              }}
            />
            <IconButton
              color="error"
              onClick={() => {
                const links = formData.linksDeCompra;
                links.splice(index, 1);
                setFormData({ ...formData, linksDeCompra: links });
              }}
            >
              <Delete />
            </IconButton>
          </Box>
        ))}

        <Button
          variant="outlined"
          onClick={() => {
            setFormData({
              ...formData,
              linksDeCompra: [...formData.linksDeCompra, { url: "" }],
            });
          }}
        >
          Adicionar link de compra
        </Button>

        <h3 className="font-semibold text-xl mt-10 text-center">
          Links de venda
        </h3>
        {formData.linksDeVenda.map((link, index) => (
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={1}
            key={`link-venda-${index}`}
          >
            <TextField
              required
              fullWidth
              label={`Link de venda ${index + 1}`}
              id={`link-venda-${index}`}
              value={link.url}
              onChange={(e) => {
                const links = formData.linksDeVenda;
                links[index] = { url: e.target.value };
                setFormData({ ...formData, linksDeVenda: links });
              }}
            />
            <IconButton
              color="error"
              onClick={() => {
                const links = formData.linksDeVenda;
                links.splice(index, 1);
                setFormData({ ...formData, linksDeVenda: links });
              }}
            >
              <Delete />
            </IconButton>
          </Box>
        ))}

        <Button
          variant="outlined"
          onClick={() => {
            setFormData({
              ...formData,
              linksDeVenda: [...formData.linksDeVenda, { url: "" }],
            });
          }}
        >
          Adicionar link de venda
        </Button>

        <Button type="submit" variant="contained" disableElevation>
          Enviar
        </Button>
      </form>
    </Container>
  );
}

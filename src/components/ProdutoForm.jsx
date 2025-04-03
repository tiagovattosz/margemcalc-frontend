import { TextField, Button, Container, IconButton, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default function ProdutoForm({
  title,
  handleSubmit,
  formData,
  setFormData,
}) {
  return (
    <Container maxWidth="md">
      <form
        className="flex flex-col gap-4 mb-8"
        onSubmit={() => {
          handleSubmit();
        }}
      >
        <h1 className="text-center text-xl font-semibold">{title}</h1>
        <TextField
          required
          label="Nome"
          name="nome"
          id="nome"
          value={formData.nome}
          onChange={(e) => {
            setFormData({ ...formData, nome: e.target.value });
          }}
        />

        <TextField
          required
          label="Preço de compra"
          name="precoCompraCentavos"
          id="precoCompraCentavos"
          type="number"
          slotProps={{
            htmlInput: {
              step: 0.01,
              min: 0,
            },
          }}
          value={formData.precoCompraCentavos / 100}
          onChange={(e) => {
            setFormData({
              ...formData,
              precoCompraCentavos: Math.round(parseFloat(e.target.value) * 100),
            });
          }}
        />

        <TextField
          required
          label="Preço de venda"
          name="precoVendaCentavos"
          id="precoVendaCentavos"
          type="number"
          slotProps={{
            htmlInput: {
              step: 0.01,
              min: 0,
            },
          }}
          value={formData.precoVendaCentavos / 100}
          onChange={(e) => {
            setFormData({
              ...formData,
              precoVendaCentavos: Math.round(parseFloat(e.target.value) * 100),
            });
          }}
        />

        <h3 className="font-semibold text-xl mt-10 text-center">
          Comissões e taxas
        </h3>

        <TextField
          required
          label="Comissão (%)"
          name="porcentagemComissaoCompra"
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
          name="valorFixoComissaoCompraCentavos"
          id="valorFixoComissaoCompraCentavos"
          type="number"
          slotProps={{
            htmlInput: {
              step: 0.01,
              min: 0,
            },
          }}
          value={formData.valorFixoComissaoCompraCentavos / 100}
          onChange={(e) => {
            setFormData({
              ...formData,
              valorFixoComissaoCompraCentavos: Math.round(
                parseFloat(e.target.value) * 100
              ),
            });
          }}
        />

        <TextField
          required
          label="Taxa (%)"
          name="porcentagemComissaoVenda"
          id="porcentagemComissaoVenda"
          type="number"
          slotProps={{
            htmlInput: {
              step: 0.01,
              min: 0,
            },
          }}
          value={formData.porcentagemComissaoVenda}
          onChange={(e) => {
            setFormData({
              ...formData,
              porcentagemComissaoVenda: e.target.value,
            });
          }}
        />

        <TextField
          required
          label="Taxa fixa (R$)"
          name="valorFixoComissaoVendaCentavos"
          id="valorFixoComissaoVendaCentavos"
          type="number"
          slotProps={{
            htmlInput: {
              step: 0.01,
              min: 0,
            },
          }}
          value={formData.valorFixoComissaoVendaCentavos / 100}
          onChange={(e) => {
            setFormData({
              ...formData,
              valorFixoComissaoVendaCentavos: Math.round(
                parseFloat(e.target.value) * 100
              ),
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

        <Button type="submit" variant="contained">
          Enviar
        </Button>
      </form>
    </Container>
  );
}
